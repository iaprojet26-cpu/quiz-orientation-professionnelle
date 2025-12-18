const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://quizorientation.online';
const ARTICLES_DIR = path.join(__dirname, '../public/articles-seo');

function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Pages Principales -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>2025-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en/" />
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/ar/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />
  </url>

  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>2025-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${BASE_URL}/a-propos</loc>
    <lastmod>2025-11-06</lastmod>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${BASE_URL}/top-metiers-futur</loc>
    <lastmod>2025-11-06</lastmod>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${BASE_URL}/contact</loc>
    <lastmod>2025-11-06</lastmod>
    <priority>0.7</priority>
  </url>
`;

  // Ajouter les 30 articles
  if (fs.existsSync(ARTICLES_DIR)) {
    const articles = fs.readdirSync(ARTICLES_DIR).filter(f => f.startsWith('article-'));
    
    articles.forEach(articleDir => {
      const metadataPath = path.join(ARTICLES_DIR, articleDir, 'metadata.json');
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        
        // Article en Français
        if (metadata.slug_fr) {
          sitemap += `
  <url>
    <loc>${BASE_URL}/blog/${metadata.slug_fr}</loc>
    <lastmod>${metadata.datePublication || '2025-01-15'}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}/blog/${metadata.slug_fr}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en/blog/${metadata.slug_en}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/ar/blog/${metadata.slug_ar}" />
  </url>`;
        }
      }
    });
  }

  sitemap += '\n</urlset>';

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('Sitemap.xml généré avec succès !');
}

generateSitemap();

