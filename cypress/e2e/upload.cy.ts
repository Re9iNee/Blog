describe("Upload", () => {
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
  });
  it("Uploads Main Image for Blog Post", () => {
    cy.visit("/dashboard/posts/create");

    cy.get('[data-cy="uploader"]').selectFile(
      "cypress/fixtures/test-image.png",
    );
    cy.get('[data-cy="upload-btn"]').click();
    cy.get('[data-cy="upload-btn"]').contains("Uploading...");
    cy.get('[data-cy="upload-btn"]').should("be.disabled");

    cy.get('[data-cy="toast"]').should("be.visible");
  });

  it("Uploads a File", () => {
    cy.visit("/dashboard/upload");

    cy.get('[data-cy="uploader"]').selectFile(
      "cypress/fixtures/test-image.png",
    );
    cy.get('[data-cy="upload-btn"]').click();
    cy.get('[data-cy="upload-btn"]').contains("Uploading...");
    cy.get('[data-cy="upload-btn"]').should("be.disabled");

    cy.get('[data-cy="uploaded-file"]').should("be.visible");
    cy.get('[data-cy="uploaded-link-copy-btn"]').click();
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.contain("test-image.png");
      });
    });

    cy.reload();
    cy.get(":nth-child(1) > .gap-2 > .text-sm").contains("test-image.png");
  });

  it("Deletes a File", () => {
    cy.visit("/dashboard/upload");

    const uploadedFile = cy.get(":nth-child(1) > .gap-2 > .text-sm");
    cy.get(':nth-child(1) > .gap-4 > [data-cy="delete-btn"]').click();

    // uploadedFile should not be in document
    uploadedFile.should("not.exist");
  });
});
