import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
    constructor(private readonly page: Page) { }

    private emailInput(): Locator {
        return this.page.locator("#username");
    }

    private passwordInput(): Locator {
        return this.page.locator("#password");
    }

    private loginButton(): Locator {
        return this.page.getByTestId("login-button");
    }

    private sidebar(): Locator {
        return this.page.getByTestId("sideBar");
    }

    async goto(): Promise<void> {
        await this.page.goto("/login", { waitUntil: "domcontentloaded" });
        await expect(this.emailInput()).toBeVisible();
    }

    async login(email: string, password: string): Promise<void> {
        // If already logged in
        if (await this.sidebar().isVisible().catch(() => false)) return;

        await this.goto();

        await this.emailInput().fill(email);
        await this.passwordInput().fill(password);
        await this.loginButton().click();

        await expect(this.sidebar()).toBeVisible();
    }
}
