import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Cart', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('should add a product to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstProductToCart();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('should navigate to cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goToCart();
    await expect(page).toHaveURL('/cart.html');
  });

});