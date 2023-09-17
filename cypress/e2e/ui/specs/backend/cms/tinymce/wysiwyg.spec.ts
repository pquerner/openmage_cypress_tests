import { backendLoginPage } from '../../../../pages/data/backend/login.page';
import { SessionState } from '../../../../pages/enums/session-state';
import { backendIndexPage } from '../../../../pages/data/backend/index.page';
import { backendCmsContentPage } from '../../../../pages/data/backend/cms.content.page';

describe(`WYSIWYG Tests`, { scrollBehavior: 'center' }, () => {
  beforeEach(() => {
    cy.session(SessionState.NOT_LOGGED_IN, () => {
      backendLoginPage.properties.get(backendLoginPage).store = '';
      backendLoginPage.visitPage();
    });
  });

  it('checks if wysiwyg editor is active', () => {
    cy.visit(backendLoginPage.getPage());
    backendLoginPage.loginSuccess();
    backendIndexPage.gotoCmsPageAndOpenContent();
  });

  it('checks if can enter text', () => {
    cy.visit(backendLoginPage.getPage());
    backendLoginPage.loginSuccess();
    backendIndexPage.gotoCmsPageAndOpenContent();
    backendCmsContentPage.enterTextWoWYSIWYGEditor('ABC');
  });

  it('checks if can enter text and mark it bold', () => {
    cy.visit(backendLoginPage.getPage());
    backendLoginPage.loginSuccess();
    backendIndexPage.gotoCmsPageAndOpenContent();
    backendCmsContentPage.enterTextWoWYSIWYGEditor('This text is bold.');
    backendCmsContentPage.markTextBold();
  });
});

