import { test, expect } from "@playwright/test";
import { EmployeePage } from "../pages/employee.page";
import { buildEmployee } from "../utils/data-gen";

test.describe("Employees", () => {
  test.beforeEach(async ({ page }) => {
    // Given I'm logged in and on the dashboard
    await page.goto("/dashboard");
  });

  test("can navigate to Employees from dashboard", async ({ page }) => {
    const employees = new EmployeePage(page);

    // When I open Employees from the left nav
    await employees.goto();

    // Then I should be on the Employees hub
    await expect(page).toHaveURL(/\/employee-hub/);
  });

  test("can add two employees and see both in the Employees list", async ({ page }) => {
    const employees = new EmployeePage(page);

    // Given I have two new employees to add
    const emp1 = buildEmployee();
    const emp2 = buildEmployee();

    // When I add the first employee
    await employees.addEmployee(emp1);

    // And I add another employee
    await employees.addAnotherEmployee(emp2);

    // And I close the success modal
    await employees.closeSuccessModal();

    // When I return to the Employees list
    await employees.goto();

    // Then both employees should be visible in the list
    await employees.expectEmployeeListed(emp1);
    await employees.expectEmployeeListed(emp2);
  });
});
