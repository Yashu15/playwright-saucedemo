import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly cartIcon: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async addFirstProductToCart() {
    await this.page.locator('.btn_inventory').first().click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}