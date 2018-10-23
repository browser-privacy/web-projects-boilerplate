const path = require('path');
const sm = require('sitemap');
const fs = require('fs');
const config = require('../../app/config').production;

const OUTPUT_FILE = path.resolve(__dirname, '../../app/assets/sitemap.xml');

/* const postsUrls = getAllPosts{data})
  .map(post => ({
    url: `${config.PUBLIC_URL}/post/${post.url}`,
    changefreq: 'weekly',
    priority: 0.8,
  }))
 */

const sitemap = sm.createSitemap({
  hostname: config.APP_PUBLIC_URL,
  cacheTime: 600000,
  urls: [
    { url: '/', changefreq: 'weekly', priority: 1 },
    // ...postsUrls
  ],
});

fs.writeFileSync(OUTPUT_FILE, sitemap.toString());
