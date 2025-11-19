import puppeteer from 'puppeteer';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', (msg) => console.log('page console:', msg.text()));
  page.on('pageerror', (err) => console.log('pageerror:', err.message));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await delay(3000);
  await page.screenshot({ path: '/tmp/app.png', fullPage: true });
  await browser.close();
  console.log('screenshot saved to /tmp/app.png');
})();
