import Page from '../../page';

class BackendIndexPage extends Page {
  public path = 'admin';

  constructor() {
    super();
    this.properties.get(this).path = this.path;
  }

  public gotoCmsPageAndOpenContent() {
    backendIndexPage.findInNavAndGoto('Pages');

    cy.get('.form-buttons')
      .contains('Add New Page')
      .click();
    cy.get('#page_tabs_content_section')
      .should('exist')
      .click();
    cy.get('#page_content_parent')
      .should('have.class', 'mceEditor');
  }
}

export const backendIndexPage: BackendIndexPage = new BackendIndexPage();
