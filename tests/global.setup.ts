import { chromium, type FullConfig, expect } from "@playwright/test";
import { env } from "../utils/env";
import * as fs from "fs";
import * as path from "path";

const STORAGE_STATE_PATH = path.resolve(__dirname, "..", ".auth", "storageState.json");

export default async function globalSetup(_config: FullConfig) {
    fs.mkdirSync(path.dirname(STORAGE_STATE_PATH), { recursive: true });

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(`${env.BASE_URL}/login`, { waitUntil: "domcontentloaded" });

    await page.locator("#username").fill(env.EMAIL);
    await page.locator("#password").fill(env.PASSWORD);

    // Click and wait for the auth redirect to settle
    await Promise.all([
        page.waitForLoadState("networkidle"),
        page.getByTestId("login-button").click(),
    ]);

    await expect(page.getByTestId("sideBar")).toBeVisible({ timeout: 30_000 });

    await page.context().storageState({ path: STORAGE_STATE_PATH });

    await browser.close();
}
