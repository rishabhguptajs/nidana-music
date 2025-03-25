import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Where your test files will be stored
  use: {
    baseURL: 'http://localhost:3001', // Your frontend URL
    headless: true, // Run tests without opening a browser window
    viewport: { width: 1280, height: 720 }, // Default browser window size
  },
  webServer: {
    command: 'npm run dev', // Command to start your frontend dev server
    port: 3001, // Port your frontend runs on
    reuseExistingServer: true, // Reuse an already running server
  },
});