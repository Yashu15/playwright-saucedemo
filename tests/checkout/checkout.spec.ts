import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout', () => {

  test('should complete checkout end to end', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add to cart and go to cart
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.goToCart();

    // Start checkout
    await checkoutPage.checkoutButton.click();

    // Fill details
    await checkoutPage.fillShippingDetails('Yashika', 'G', '6000');

    // Finish
    await checkoutPage.finishButton.click();

    // Confirm
    await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
  });

});