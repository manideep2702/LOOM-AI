import { test } from '@playwright/test';

test('capture console errors', async ({ page }) => {
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push(msg.text()));
  page.on('pageerror', error => consoleMessages.push(`pageerror: ${error.message}`));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('console messages:', consoleMessages);
});
