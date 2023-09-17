import Page from '../../page';

class BackendLoginPage extends Page {
  public path = 'admin';

  constructor() {
    super();
    this.properties.get(this).path = this.path;
  }

  public loginSuccess() {
    cy.fixture('backend-admin-user').then((data) => {
      this.login(data.username, data.password);
      cy.url().should('include', 'admin/dashboard');
    });
  }

  public loginFailure() {
    this.login('failure', 'failure');
    cy.get('.error-msg').should('be.visible')
      .should('include.text', 'You did not sign in correctly or your account is temporarily disabled.');
  }

  private login(username: string, password: string) {
    cy.get('#username').should('be.visible').type(username);
    cy.get('#login').should('be.visible').type(password);
    cy.get('.form-button').should('be.visible').click();
  }
}

export const backendLoginPage: BackendLoginPage = new BackendLoginPage();
