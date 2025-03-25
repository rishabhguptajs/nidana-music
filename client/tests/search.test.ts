import { test, expect } from "@playwright/test";

test("should search for songs and display results", async ({ page }) => {
  test.setTimeout(60000); // Increase timeout to 60s for slow networks

  // Navigate to the search page
  await page.goto("/search");
  await page.waitForLoadState("networkidle");

  // Enter a search query and trigger the search
  await page.fill('input[type="text"]', "song");
  await page.click("button.bg-blue-500");
  await page.waitForTimeout(1000); // Wait for search to process

  // Wait for the search results list to load and be visible
  await page.waitForSelector("div.p-4 ul", { state: "visible", timeout: 10000 });
  await page.waitForSelector("div.p-4 ul > li", { state: "attached", timeout: 10000 });

  // Verify that results are displayed
  const searchResults = await page.$$("div.p-4 ul > li");
  expect(searchResults.length).toBeGreaterThan(0); // At least one result should appear

  // Check that the first result contains the search term
  const firstResultText = await page.textContent("div.p-4 ul > li:first-child");
  expect(firstResultText?.toLowerCase()).toContain("song");

  // Ensure no error message is present
  const errorMessage = await page.$(".text-red-500");
  expect(errorMessage).toBeNull();
});