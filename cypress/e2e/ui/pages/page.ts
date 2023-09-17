import 'cypress-if';
import 'cypress-wait-until';

import AbstractPageClass from './abstract';

export default class Page extends AbstractPageClass {

  public properties = new WeakMap();

  constructor() {
    super();
    this.properties.set(this, {
      path: '/',
      hashCode: '',
      store: Cypress.env('store') || 'testshop'
    });
  }

  /**
   * Sets a path. Careful, this is not getting reset and will continue to live on in the page object.
   * @param path
   */
  public setPath(path: string) {
    this.properties.get(this).path = path;
  }

  public getProject() {
    return Cypress.env('project');
  }

  public getStore() {
    return this.properties.get(this).store;
  }

  public getProperty(property: string) {
    return this.properties.get(this)[property];
  }

  public beforeLoadPage() {
    //noop
  }

  public afterLoadPage() {
    this.checkAllLinks();
  }

  public getPage() {
    return this.getBaseUrl() + this.getStore() + this.getPath();
  }

  public getPath() {
    return this.properties.get(this).path;
  }

  public getBaseUrl() {
    return Cypress.env('baseUrl');
  }

  public visitPage() {
    this.beforeLoadPage();
    this.afterLoadPage();
  }

  public findInNavAndGoto(target: string) {
    cy.get('#nav').should('exist')
      .contains(target)
      .click({ force: true });
  }
}

export const page: Page = new Page();
