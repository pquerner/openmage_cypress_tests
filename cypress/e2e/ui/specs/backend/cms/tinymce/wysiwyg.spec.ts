import { backendLoginPage } from '../../../../pages/data/backend/login.page';
import { SessionState } from '../../../../pages/enums/session-state';
import { backendIndexPage } from '../../../../pages/data/backend/index.page';
import { backendCmsContentPage } from '../../../../pages/data/backend/cms.content.page';

describe(`WYSIWYG Tests`, { scrollBehavior: 'center' }, () => {
  beforeEach(() => {
    cy.session(SessionState.NOT_LOGGED_IN, () => {
      backendLoginPage.properties.get(backendLoginPage).store = '';
      backendLoginPage.visitPage();
      backendLoginPage.loginSuccess();
      // TODO clear cache, just in case
    });
  });

  it('checks if wysiwyg editor is active', () => {
    cy.visit(backendLoginPage.getPage());
    backendIndexPage.gotoCmsPageAndOpenContent();
  });

  it('checks if can enter text', () => {
    cy.visit(backendLoginPage.getPage());
    backendIndexPage.gotoCmsPageAndOpenContent();
    backendCmsContentPage.enterTextWoWYSIWYGEditor('ABC');
  });

  it('checks if can enter text and mark it bold', () => {
    cy.visit(backendLoginPage.getPage());
    backendIndexPage.gotoCmsPageAndOpenContent();
    backendCmsContentPage.enterTextWoWYSIWYGEditor('This text is bold.');
    backendCmsContentPage.markTextBold();
  });

  it('checks if widget button opens widget popup', () => {
    cy.visit(backendLoginPage.getPage());
    backendIndexPage.gotoCmsPageAndOpenContent();
    backendCmsContentPage.openMageWidget();
  });

  it('checks if widget button opens widget popup and can configure a new cms page link widget', () => {
    cy.visit(backendLoginPage.getPage());
    backendIndexPage.gotoCmsPageAndOpenContent();
    backendCmsContentPage.openMageWidget();
    backendCmsContentPage.configureMageWidgetCmsPageLink(
      'ABC',
      'ABC',
      'cms/widget/link/link_block.phtml',
      'no-route');
  });
});

