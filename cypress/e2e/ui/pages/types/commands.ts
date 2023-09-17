/// <reference types="cypress" />
// @ts-ignore

declare global {
  namespace Cypress {
    interface Chainable {
      any(size?: number): Chainable;
    }
  }
}
