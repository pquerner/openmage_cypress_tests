import { SessionState } from '../../pages/enums/session-state';
import { backendLoginPage } from '../../pages/data/backend/login.page';

for (const size of backendLoginPage.sizes) {
  describe(`Backend Auth Page Test for ${size}`, { scrollBehavior: 'center' }, () => {
    beforeEach(() => {
      cy.session(SessionState.NOT_LOGGED_IN, () => {
        backendLoginPage.properties.get(backendLoginPage).store = '';
        backendLoginPage.visitPage();
      });
    });

    it('checks if login is possible with correct login data', () => {
      cy.visit(backendLoginPage.getPage());
      backendLoginPage.loginSuccess();
    });

    it('checks if login is impossible with incorrect login data', () => {
      cy.visit(backendLoginPage.getPage());
      backendLoginPage.loginFailure();
    });
  });
}
