import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { users } from '../../testdata/users';

test.describe('Cart - Remove Items', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('should remove a product from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Add product first
    await inventoryPage.addFirstProductToCart();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Go to cart
    await inventoryPage.goToCart();

    // NEW COMMAND: locator chaining — finds remove button inside cart item
    await page.locator('.cart_item').locator('[data-test^="remove"]').click();

    // After removal, badge should completely disappear
    // NEW COMMAND: toHaveCount(0) — asserts element does not exist
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('should show empty cart after removing all items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Add and then remove
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.goToCart();
    await page.locator('.cart_item').locator('[data-test^="remove"]').click();

    // Cart list should be empty — no cart items present
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

});