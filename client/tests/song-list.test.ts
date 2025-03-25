import { test, expect } from '@playwright/test';

test('should display the list of songs on the home page', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('ul');

  const songItems = await page.$$('ul > li');
  expect(songItems.length).toBeGreaterThan(0);
});