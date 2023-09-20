import Page from '../../page';

class BackendCmsContentPage extends Page {
  public path = 'admin';

  constructor() {
    super();
    this.properties.get(this).path = this.path;
  }

  public enterTextWoWYSIWYGEditor(text: string) {
    cy.get('iframe#page_content_ifr')
      .should('exist')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .should('exist')
          .should('have.id', 'tinymce')
          .type(text);
        cy.wrap($body)
          .should('have.text', text);
      });
  }

  public markTextBold() {
    cy.get('iframe#page_content_ifr')
      .should('exist')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .should('exist')
          .should('have.id', 'tinymce')
          .type('{selectAll}');
      });

    //old tinymce
    // cy.get('#page_content_bold')
    //   .should('exist')
    //   .click();

    //tinymce6
    cy.get('button[aria-label="Bold"]')
      .should('exist')
      .should('be.visible')
      .click();

    cy.get('iframe#page_content_ifr')
      .should('exist')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .should('contain.html', '<strong>');
      });
  }

  public openMageWidget() {
    cy.intercept({
      method: 'POST',
      pathname: '**/admin/widget/index/**/widget_target_id/page_content/**'
    }).as('adminhtml_widget_opens');

    //old tinymce
    // cy.get('#page_content_magentowidget')
    //   .should('exist')
    //   .click();

    //tinymce 6
    cy.get('button[aria-label="OpenMage Widget"]')
      .should('exist')
      .should('be.visible')
      .click();

    cy.wait('@adminhtml_widget_opens');
    cy.get('#widget_window')
      .should('be.visible');
  }

  public configureMageWidgetCmsPageLink(
    anchorText: string,
    anchorTitle: string,
    template: string,
    cmsPageUrlKey: string
  ) {
    cy.get('#select_widget_type')
      .should('exist')
      .should('be.visible')
      .select('cms/widget_page_link');

    cy.get('select.widget-option.select')
      .should('exist')
      .should('be.visible')
      .select(template);

    cy.get('input[name="parameters[anchor_text]"]')
      .should('exist')
      .should('be.visible')
      .type(anchorText)
      .should('have.value', anchorText);

    cy.get('input[name="parameters[title]"]')
      .should('exist')
      .should('be.visible')
      .type(anchorTitle)
      .should('have.value', anchorTitle);

    cy.get('button.scalable.btn-chooser')
      .should('exist')
      .should('be.visible')
      .click();

    cy.get('#widget-chooser')
      .should('exist')
      .should('be.visible');

    cy.get('table.data')
      .contains('td', cmsPageUrlKey)
      .should('be.visible')
      .click();

    cy.get('#widget-chooser')
      .should('not.exist');

    cy.get('.widget-option-label')
      .should('exist')
      .should('be.visible')
      .should('include.text', '404');
  }
}

export const backendCmsContentPage: BackendCmsContentPage = new BackendCmsContentPage();
