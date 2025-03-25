import { test, expect } from "@playwright/test";

test("should add and remove songs from favorites", async ({ page }) => {
  test.setTimeout(60000); // Increase timeout to 60s for slow networks

  // Navigate to the home page
  await page.goto("/");
  await page.waitForLoadState("networkidle"); // Wait for all network requests

  // Wait for the song list to load and be visible
  await page.waitForSelector("div.p-4 ul", { state: "visible", timeout: 10000 });
  await page.waitForSelector("div.p-4 ul > li", { state: "attached", timeout: 10000 });

  // Click the favorite button on the first song
  await page.click("div.p-4 ul > li:first-child button:nth-child(2)"); // Second button is the favorite button
  await page.waitForTimeout(1000); // Wait for the action to process

  // Navigate to the favorites page
  await page.goto("/favorites");
  await page.waitForLoadState("networkidle");

  // Wait for the favorites list to load and be visible
  await page.waitForSelector("div.p-4 ul", { state: "visible", timeout: 10000 });
  await page.waitForSelector("div.p-4 ul > li", { state: "attached", timeout: 10000 });

  // Verify the first favorite song is displayed
  const favoriteSong = await page.textContent("div.p-4 ul > li:first-child");
  expect(favoriteSong).toBeTruthy(); // Check that some song is present (adjust for specific song if needed)

  // Click the unfavorite button
  await page.click("div.p-4 ul > li:first-child button:nth-child(2)");
  await page.waitForTimeout(1000); // Wait for the action to process

  // Reload the page to confirm the update
  await page.reload();
  await page.waitForLoadState("networkidle");

  // Check if the favorites list is empty
  const songItems = await page.$$("div.p-4 ul > li");
  expect(songItems.length).toBe(0); // List should be empty after unfavoriting
});