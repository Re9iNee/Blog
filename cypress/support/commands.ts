/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit("/dashboard/admin");
      cy.visit("/api/auth/signin");
      cy.get("#input-email-for-credentials-provider").type(`${email}`);
      cy.get("#input-password-for-credentials-provider").type(
        `${password}{enter}`
      );
      cy.getCookie("next-auth.csrf-token").should("exist");
      cy.getCookie("next-auth.session-token").should("exist");
      cy.get("h1").should("contain", "Admin Dashboard");
    },
    {
      validate: () => {
        cy.getCookie("next-auth.csrf-token").should("exist");
        cy.getCookie("next-auth.session-token").should("exist");
      },
    }
  );
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
