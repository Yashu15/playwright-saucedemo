//Page represent the browser tab and the locators represent the elements on the page. 
// The page object model is a design pattern that helps to create an object repository for web UI elements. 
// It helps to reduce code duplication and improves test maintenance.
import { Page, Locator } from '@playwright/test';

//Class groups everything related to the login page in one place
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  //The constructor runs automatically when you create a LoginPage object. 
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  //navigates to the login page
  async goto() {
    await this.page.goto('/');
  }

  //reusable login method
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}