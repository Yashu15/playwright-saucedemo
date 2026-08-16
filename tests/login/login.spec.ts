import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { users } from '../../testdata/users';

//Groups all login-related tests together under the label Login
test.describe('Login', () => {
  //Login with valid credentials
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL('/inventory.html');
  });
  //Login with wrong credentials
  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.invalid.username, users.invalid.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });
  //Logout test
  test('should logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto()
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
  });
  test('should show error for locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // locked_out_user is a special Sauce Demo user that is blocked
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    // NEW COMMAND: toContainText() — checks partial text match
    // Useful when you don't want to assert the full string
    await expect(loginPage.errorMessage).toContainText('locked out');
  });
  test('should show error when username is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Click login without entering anything
    await loginPage.loginButton.click();

    // NEW COMMAND: toBeVisible() combined with toContainText()
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

});