import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { users } from '../../testdata/users';
import { checkoutData } from '../../testdata/checkoutData';

test.describe('Checkout', () => {
  //end to end test
  test('should complete checkout end to end', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    // Add to cart and go to cart
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.goToCart();

    // Start checkout
    await checkoutPage.checkoutButton.click();

    // Fill details
    await checkoutPage.fillShippingDetails(checkoutData.validCustomer.firstName, checkoutData.validCustomer.lastName, checkoutData.validCustomer.postCode);

    // Finish
    await checkoutPage.finishButton.click();

    // Confirm
    await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
  });

});

//AAA Pattern: Arrange, Act, Assert
//Arrange: Set up the initial state and prepare the necessary objects and data for the test.
//Act: Perform the action or behavior that you want to test.
//Assert: Verify that the expected outcome has occurred, usually by checking the state of the system or the values of certain variables.    
