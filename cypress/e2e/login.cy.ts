describe("Login", () => {
  it("Logs in", function () {
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    cy.visit("/dashboard");

    // expect the login form to redirect auth page
    cy.url().should("contain", "/api/auth/signin");

    cy.get("#input-email-for-credentials-provider").type(email);
    cy.get("#input-password-for-credentials-provider").type(
      `${password}{enter}`
    );

    cy.getCookie("next-auth.csrf-token").should("exist");
    cy.getCookie("next-auth.session-token").should("exist");

    // page title should contain Dashboard
    cy.title().should("contain", "Dashboard");
  });
});
