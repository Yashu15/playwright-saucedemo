import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory', () => {

  // Runs before every test in this file — logs in first
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('should sort products by price low to high', async ({ page }) => {
    // NEW COMMAND: selectOption() — interacts with dropdowns
    // Selects an option by its value attribute
    await page.selectOption('.product_sort_container', 'lohi');

    // Get all price elements on the page
    const prices = await page.locator('.inventory_item_price').allTextContents();

    // Convert price strings like "$9.99" to numbers for comparison
    const priceNumbers = prices.map((p) => parseFloat(p.replace('$', '')));

    // Verify prices are in ascending order
    for (let i = 0; i < priceNumbers.length - 1; i++) {
      expect(priceNumbers[i]).toBeLessThanOrEqual(priceNumbers[i + 1]);
    }
  });

  test('should add multiple products to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Add first product
    await inventoryPage.addFirstProductToCart();

    // NEW COMMAND: nth() — selects element by index (0 = first, 1 = second)
    // Clicks the second "Add to cart" button
    await page.locator('.btn_inventory').nth(1).click();

    // NEW COMMAND: toHaveCount() — asserts the number of matching elements
    // Cart badge should now show 2
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test('should navigate to product detail page', async ({ page }) => {
    // Click on the first product title
    await page.locator('.inventory_item_name').first().click();

    // NEW COMMAND: getAttribute() — gets the value of an HTML attribute
    // Checks the URL contains "inventory-item"
    const url = page.url();
    expect(url).toContain('inventory-item');

    // Verify the product detail page has a back button
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });

});