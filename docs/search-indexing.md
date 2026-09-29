# 搜索收录与发布检查

## 网站结构

正式域名为 `https://qca-committee.org.au`。英文保留原网址，简体、繁体分别使用 `/zh-CN/` 和 `/zh-TW/`，每种语言都有首页、about、events、news、membership 五个页面。

页面在构建时生成对应语言的正文、标题、简介、HTML lang、canonical 和四组语言关联（en、zh-CN、zh-TW、x-default）。英文为 x-default。网址决定语言，不再读取浏览器以前保存的语言偏好。语言切换使用普通链接并整页加载，保留栏目、查询参数和锚点；其他站内导航仍使用 Next Link。

共享正文在 `components/pages/`，翻译继续在 `content/locales/`；页面网址和搜索信息由 `lib/seo.ts` 管理。增加栏目时须同时增加路由、搜索配置及静态验证脚本的预期页面列表。

## 构建及检查

```sh
npm run lint
npm run build
npm run typecheck -- --incremental false
npm run check:seo
```

静态检查覆盖 15 页原始 HTML、唯一标题、主标题、语言、正文、canonical、双向 hreflang、内部链接、锚点、资源、robots、站点地图及 404 noindex。它会在 GitHub Pages 上传构建产物前自动执行。

子路径兼容性检查：

```sh
NEXT_PUBLIC_BASE_PATH=/aqac_website npm run build
node scripts/check-seo.mjs out /aqac_website
npm run build
```

最后一条命令恢复根域名构建。正式自定义域名的 basePath 应为空；预览构建不要提交到 Google。子路径部署时 robots 文件只有放在主机根目录才控制爬虫，本项目正式域名采用根目录部署。

浏览器验收：桌面及 390px 手机宽度，检查三语言直接打开和刷新、导航、语言切换、活动锚点、图片、新闻筛选和会员弹窗。禁用 JavaScript 后正文应可读；展开、筛选、弹窗等互动功能仍需要脚本。

## Google Search Console 当前配置

已添加 HTTPS URL-prefix 资源 `https://qca-committee.org.au/`，使用 Google 提供的 HTML meta 标签验证，覆盖本次全部 15 个正式页面。验证标签位于英文首页的 metadata 中，是需要公开输出的所有权证明；验证成功后仍须保留。

域名资源 `qca-committee.org.au` 也已创建，DNS 验证尚待完成。它可覆盖其他协议及子域名，但不是当前 HTTPS 主站提交收录的前提。Cloudflare 登录尚未完成，因此采用上述网页验证方式继续主站收录流程。

## 域名资源的可选 DNS 验证

1. 登录 https://search.google.com/search-console/，先检查现有资源，避免重复添加。
2. 选择域名资源 `qca-committee.org.au`。DNS 托管商为 Cloudflare；使用手动 TXT 验证即可，无需将 DNS 账号授权给 Google。
3. 在 Cloudflare 中选择该域名 → DNS → Records → Add record：类型 `TXT`，名称 `@`，TTL `Auto`；内容复制 Search Console 当前显示的完整 `google-site-verification=...`。不要替换已有的 TXT、MX 或网站解析记录。
4. 保存后回到 Search Console 点击 Verify。若尚未生效，稍后重试；成功后保留 TXT 记录。
5. 网站发布成功后，在 Sitemaps 中提交 `https://qca-committee.org.au/sitemap.xml`。
6. 分别检查以下首页，运行 Test live URL，确认允许抓取及索引，再点击 Request indexing：
   - `https://qca-committee.org.au/`
   - `https://qca-committee.org.au/zh-CN/`
   - `https://qca-committee.org.au/zh-TW/`
7. 对尚未收录的代表性栏目页面记录索引原因、最近抓取时间、用户声明的 canonical 和 Google 选择的 canonical。不要把实时测试通过当成已收录。

DNS 验证值属于具体账号，必须使用 Google 实际提供的记录；不要用其他账号或其他网站的验证值。主站 HTML 验证标签按 Google 要求公开保留。

## 发布与复查

推送到 main 会触发现有 GitHub Pages 工作流。部署成功后检查上述三种语言首页、代表性深层页面、robots.txt、sitemap.xml 均返回 200；未知地址（包括未知语言）返回 404，HTTP 和 www 继续跳转到 HTTPS 主域名。

发布后 7–14 天复查 Pages 索引报告及 Performance 搜索词，分别关注英文名称、简体名称和繁体名称。`site:` 搜索仅作辅助，Search Console 索引报告为主要依据。抓取和收录没有固定完成时间，也不保证特定排名。

| 检查时间 | 页面或范围 | Google 索引状态及原因 | Google 所选 canonical | 下一步 |
| --- | --- | --- | --- | --- |
| 首次提交 | 三语言首页及站点地图 | 主站网页验证完成后记录 | 待记录 | 验证并提交 |
| 发布后 7–14 天 | 索引报告与品牌搜索词 | 待复查 | 待记录 | 根据实际原因处理 |

如需回退：撤销本次 SEO 修复提交（使用新的 revert 提交，勿强制覆盖历史），推送 main 重新部署。回退后三语言新增网址可能暂时返回 404，需同步检查站点地图和 Search Console 状态。

参考：https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
