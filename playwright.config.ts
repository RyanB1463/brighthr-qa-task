import { defineConfig, devices } from "@playwright/test";
import { env } from "./utils/env";

const isCI = Boolean(process.env.CI);

const STORAGE_STATE_PATH = ".auth/storageState.json";
const GLOBAL_SETUP_PATH = "./tests/global.setup";
const OUTPUT_DIR = "test-results";

const retries = isCI ? 2 : 0;
const headless = isCI ? true : false;
const trace = isCI ? "retain-on-failure" : "on-first-retry";
const video = isCI ? "retain-on-failure" : "off";

export default defineConfig({
  testDir: "./tests",
  globalSetup: require.resolve(GLOBAL_SETUP_PATH),

  timeout: 60_000,
  expect: { timeout: 10_000 },

  retries,

  use: {
    baseURL: env.BASE_URL,
    storageState: STORAGE_STATE_PATH,

    headless,

    trace,
    video,
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
  ],

  outputDir: OUTPUT_DIR,
  reporter: [["html", { open: "never" }], ["list"]],
});
