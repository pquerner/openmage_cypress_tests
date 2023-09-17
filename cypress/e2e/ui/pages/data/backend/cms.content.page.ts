import Page from '../../page';

class BackendCmsContentPage extends Page {
  public path = 'admin';

  constructor() {
    super();
    this.properties.get(this).path = this.path;
  }

  public enterTextWoWYSIWYGEditor(text: string) {
    cy.get('#page_content_ifr')
      .should('exist')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .should('exist')
          .should('have.class', 'mceContentBody')
          .should('have.id', 'tinymce')
          .type(text);
        cy.wrap($body)
          .should('have.text', text);
      });
  }

  public markTextBold() {
    cy.get('#page_content_ifr')
      .should('exist')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .should('exist')
          .should('have.class', 'mceContentBody')
          .should('have.id', 'tinymce')
          .type('{selectAll}');
      });
    cy.get('#page_content_bold')
      .should('exist')
      .click();
    cy.get('#page_content_ifr')
      .should('exist')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .should('contain.html', '<strong>');
      });
  }
}

export const backendCmsContentPage: BackendCmsContentPage = new BackendCmsContentPage();
