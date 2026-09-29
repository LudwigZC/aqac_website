import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, extname } from "node:path";

// Inspect exported HTML, rather than rendered client state: this is what crawlers receive.
const output = resolve(process.argv[2] || "out");
const base = (process.argv[3] || "").replace(/\/$/, "");
const origin = "https://qca-committee.org.au";
const locales = ["en", "zh-CN", "zh-TW"];
const pages = ["", "about", "events", "news", "membership"];
const pathFor = (locale, page) => `${base}/${locale === "en" ? "" : `${locale}/`}${page ? `${page}/` : ""}`;
const decode = (s) => s.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), decode(m[2])]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map((m) => attrs(m[0]));
const exportedFile = (urlPath) => {
  assert(urlPath.startsWith(`${base}/`), `Missing basePath: ${urlPath}`);
  const relative = decodeURIComponent(urlPath.slice(base.length)).replace(/^\//, "");
  return resolve(output, relative, extname(relative) ? "" : "index.html");
};
const expectedUrls = [];
const titles = new Set();
for (const locale of locales) {
  const dict = JSON.parse(readFileSync(new URL(`../content/locales/${locale}.json`, import.meta.url), "utf8"));
  for (const page of pages) {
    const path = pathFor(locale, page);
    const html = readFileSync(exportedFile(path), "utf8");
    const content = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    const links = tags(content, "link");
    const meta = tags(content, "meta");
    const canonical = `${origin}${path}`;
    expectedUrls.push(canonical);
    assert.equal(tags(html, "html")[0].lang, locale, `${path}: language`);
    assert(content.includes(dict.brand.name), `${path}: localized brand absent from HTML`);
    const primaryText = page === "" ? dict.home.hero.description : page === "about" ? dict.about.intro.title : dict[page].title;
    assert(content.includes(primaryText), `${path}: localized main content absent`);
    assert.equal(tags(content, "h1").length, 1, `${path}: must have one main heading`);
    const title = content.match(/<title>(.*?)<\/title>/)?.[1];
    assert(title?.includes(dict.brand.name), `${path}: title`);
    assert(!titles.has(title), `${path}: duplicate title`);
    titles.add(title);
    assert(meta.some((m) => m.name === "description" && m.content.length > 10), `${path}: description`);
    assert(!meta.some((m) => m.name === "robots" && /noindex|none/.test(m.content)), `${path}: noindex`);
    assert.deepEqual(links.filter((l) => l.rel === "canonical").map((l) => l.href), [canonical]);
    const alternatives = links.filter((l) => l.rel === "alternate");
    assert.equal(alternatives.length, 4, `${path}: language alternatives`);
    for (const alternate of [...locales, "x-default"]) {
      assert.equal(alternatives.find((l) => l.hreflang === alternate)?.href,
        `${origin}${pathFor(alternate === "x-default" ? "en" : alternate, page)}`);
    }
    assert(!/style="[^"]*opacity:0(?:[;"\s])/.test(content), `${path}: content hidden before JS`);
    for (const a of tags(content, "a")) {
      if (!a.href?.startsWith("/") || a.href.startsWith("//")) continue;
      const u = new URL(a.href, origin);
      const file = exportedFile(u.pathname);
      assert(existsSync(file), `${path}: broken link ${a.href}`);
      if (!a.hreflang) {
        const relative = u.pathname.slice(base.length);
        assert(locale === "en" ? !/^\/zh-(CN|TW)\//.test(relative) : relative.startsWith(`/${locale}/`), `${path}: language lost in ${a.href}`);
      }
      if (u.hash) assert(readFileSync(file, "utf8").includes(`id="${u.hash.slice(1)}"`), `${path}: missing anchor ${a.href}`);
    }
    for (const item of [...tags(content, "img"), ...tags(html, "script"), ...links]) {
      const asset = item.src || (["stylesheet", "icon", "preload"].includes(item.rel) ? item.href : null);
      if (asset?.startsWith("/")) assert(existsSync(exportedFile(new URL(asset, origin).pathname)), `${path}: missing asset ${asset}`);
    }
  }
}
const sitemap = readFileSync(resolve(output, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
assert.deepEqual(urls.sort(), expectedUrls.sort());
assert.equal(new Set(urls).size, 15);
assert(!sitemap.includes("<lastmod>"), "Do not invent content modification dates");
const robots = readFileSync(resolve(output, "robots.txt"), "utf8");
assert(robots.includes("User-Agent: *") && robots.includes("Allow: /"));
assert(robots.includes(`Sitemap: ${origin}${base}/sitemap.xml`));
const notFound = readFileSync(resolve(output, "404.html"), "utf8");
assert(tags(notFound, "meta").some((m) => m.name === "robots" && m.content.includes("noindex")));
console.log(`PASS: 15 exported pages, localized HTML, titles, headings, canonical/hreflang, navigation, assets, sitemap, robots and 404 (basePath=${base || "/"}).`);
