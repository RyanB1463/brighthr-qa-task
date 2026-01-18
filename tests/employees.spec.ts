import { test } from "@playwright/test";
import { EmployeePage } from "../pages/employee.page";

test("navigate to Employees from dashboard", async ({ page }) => {
    const employees = new EmployeePage(page);
    await page.goto("/dashboard");
    await employees.goto();
});
