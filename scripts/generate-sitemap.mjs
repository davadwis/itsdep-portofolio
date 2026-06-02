import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const baseUrl = "https://itsdep.space";
const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${baseUrl}/`, priority: "1.0" },
  { loc: `${baseUrl}/?lang=id`, priority: "0.9" },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve("public", "sitemap.xml"), xml, "utf8");
