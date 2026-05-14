# Updating site content

This site reads **events**, **news**, and most marketing copy from locale JSON at build time. Static images are served from **`public/`** (URLs start with `/`).

## Events and news (text)

1. Edit these three files and keep the **same structure** in each (same number of entries, same order):

   - [`content/locales/en.json`](content/locales/en.json)
   - [`content/locales/zh-CN.json`](content/locales/zh-CN.json)
   - [`content/locales/zh-TW.json`](content/locales/zh-TW.json)

2. **Events:** update the `events.items` array. Each entry needs a stable **`slug`** (same in all three locale files) used for the banner image path: put **`public/images/events/<slug>.jpg`** (see [`paths.py`](paths.py) `EVENT_BANNERS` and [`lib/eventAssets.ts`](lib/eventAssets.ts)).

3. **Home featured events:** edit **`home.featuredEvents.featuredSlugs`** — an ordered list of slugs that must exist on `events.items`. Copy is no longer duplicated under `featuredEvents.items`.

4. **News:** update the `news.items` array (tag, title, excerpt, date).

5. **Home page** latest news still uses `home.latestNews`; featured events resolve via [`lib/featuredEvents.ts`](lib/featuredEvents.ts).

After editing, commit and push; your host (e.g. Vercel) should rebuild from GitHub.

## Gallery photos

1. Add image files under **`public/images/gallery/`** so they are available at URLs like `/images/gallery/your-file.jpg`.

2. Expected filenames for the current About page tiles are documented in [`paths.py`](paths.py) (`GALLERY_PHOTOS`). The gallery entries in each locale file use an optional **`src`** field (same path in all three locales is fine), for example:

   `/images/gallery/community-gathering.jpg`

3. If **`src`** is omitted from JSON, that tile uses only the CSS **gradient**. If **`src`** is set, add the matching file under `public/images/gallery/` so the image loads correctly.

## Other images (reference)

[`paths.py`](paths.py) lists conventions for hero, about feature, team headshots, event banners, and news covers when you add those assets and wire them in components.
