import { Page, Locator, expect } from "@playwright/test";
import { EmployeeData } from "../utils/data-gen";

export class EmployeePage {
    constructor(private readonly page: Page) { }


    private sidebar(): Locator {
        return this.page.getByTestId("sideBar");
    }

    private employeesNavLink(): Locator {
        return this.sidebar().locator('a[data-e2e="employees"][href="/employee-hub"]');
    }


    private addEmployeeButton(): Locator {
        return this.page.getByRole("button", { name: "Add employee" });
    }


    private addEmployeeHeading(): Locator {
        return this.page.getByRole("heading", { name: "Add new employee" });
    }

    private firstNameInput(): Locator {
        return this.page.locator("#firstName");
    }

    private lastNameInput(): Locator {
        return this.page.locator("#lastName");
    }

    private emailInput(): Locator {
        return this.page.locator("#email");
    }

    private phoneNumberInput(): Locator {
        return this.page.locator("#phoneNumber");
    }

    private jobTitleInput(): Locator {
        return this.page.locator("#jobTitle");
    }

    private registrationEmailCheckbox(): Locator {
        return this.page.locator("#registrationEmail");
    }

    private startDateTrigger(): Locator {
        return this.page.locator('#startDate [data-testid="input-selector"]');
    }

    private dayPickerPanel(): Locator {
        return this.page.getByTestId("daypicker-panel");
    }

    private saveNewEmployeeButton(): Locator {
        return this.page.getByRole("button", { name: "Save new employee" });
    }

    private successModalHeading(): Locator {
        return this.page.getByRole("heading", { name: "Success! New employee added" });
    }

    private addAnotherEmployeeButton(): Locator {
        return this.page.getByRole("button", { name: "Add another employee" });
    }

    // Helpers
    private isoToAriaLabel(isoDate: string): string {
        const d = new Date(`${isoDate}T00:00:00Z`);
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const wd = weekdays[d.getUTCDay()];
        const mon = months[d.getUTCMonth()];
        const day = String(d.getUTCDate()).padStart(2, "0");
        const year = d.getUTCFullYear();

        return `${wd} ${mon} ${day} ${year}`;
    }

    private dayCellByAriaLabel(label: string): Locator {
        return this.dayPickerPanel().getByRole("gridcell", { name: label });
    }


    async goto(): Promise<void> {
        await expect(this.sidebar()).toBeVisible();
        await this.employeesNavLink().click();
        await expect(this.page).toHaveURL(/\/employee-hub/);
        await expect(this.addEmployeeButton()).toBeVisible();
    }

    async openAddEmployee(): Promise<void> {
        await this.addEmployeeButton().click();
        await expect(this.addEmployeeHeading()).toBeVisible();
    }

    async fillEmployeeForm(data: EmployeeData): Promise<void> {
        await this.firstNameInput().fill(data.firstName);
        await this.lastNameInput().fill(data.lastName);
        await this.emailInput().fill(data.email);

        if (data.phoneNumber) await this.phoneNumberInput().fill(data.phoneNumber);
        if (data.jobTitle) await this.jobTitleInput().fill(data.jobTitle);

        // Checkbox state (default true)
        const shouldSend = data.sendRegistrationEmail ?? true;
        const isChecked = await this.registrationEmailCheckbox().isChecked();
        if (shouldSend !== isChecked) {
            await this.registrationEmailCheckbox().click();
        }

        // Optional start date
        if (data.startDate) {
            await this.startDateTrigger().click();
            await expect(this.dayPickerPanel()).toBeVisible();

            const label = this.isoToAriaLabel(data.startDate);
            await this.dayCellByAriaLabel(label).click();
        }
    }

    async saveEmployee(): Promise<void> {
        await this.saveNewEmployeeButton().click();
    }

    async addEmployee(data: EmployeeData): Promise<void> {
        await this.goto();
        await this.openAddEmployee();
        await this.fillEmployeeForm(data);
        await this.saveEmployee();
        await expect(this.successModalHeading()).toBeVisible();
    }

    async addAnotherEmployee(data: EmployeeData): Promise<void> {
        // Precondition if success modal visible
        await expect(this.successModalHeading()).toBeVisible();

        await this.addAnotherEmployeeButton().click();
        await expect(this.addEmployeeHeading()).toBeVisible();

        await this.fillEmployeeForm(data);
        await this.saveEmployee();
        await expect(this.successModalHeading()).toBeVisible();
    }
}
