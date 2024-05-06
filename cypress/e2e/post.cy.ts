import { PostStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

describe("Post", () => {
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.visit("/dashboard/posts");
  });

  it("Creates a new Blog Post", () => {
    cy.get('[data-cy="create"]').should("be.visible").click();

    cy.url().should("contain", "/dashboard/posts/create");

    cy.get('[data-cy="name"]').type(faker.lorem.sentence());

    cy.get('[data-cy="status-select-trigger"]').click();
    cy.get('[data-cy="status-published"]').click();

    cy.get('[data-cy="reading-time"]').type(
      faker.number.int({ min: 1, max: 20 }).toString()
    );
    cy.get('[data-cy="summary"]').type(
      faker.lorem.sentence({ min: 5, max: 10 })
    );
    cy.get('[data-cy="body"]').type(faker.lorem.paragraphs(1));

    cy.get('[data-cy="create-post-form"]').submit();

    cy.url().should("not.contain", "create");
  });

  it("Views a Blog Post", () => {
    // data table should be visible and have at least one row
    cy.get('[data-cy="data-table"]').should("be.visible");
    cy.get('[data-cy="data-table-row"]').should("be.visible");
  });

  it("Edits a Blog Post", () => {
    cy.get('[data-cy="edit-post"]').click();

    cy.url().should("be", /\/dashboard\/posts\/\d+\/edit/g);

    cy.get('[data-cy="name"]').type(faker.lorem.slug(20));
    cy.get('[data-cy="status"]').select(PostStatus.published);
    cy.get('[data-cy="reading-time"]').type(
      faker.number.int({ min: 1, max: 20 }).toString()
    );
    cy.get('[data-cy="summary"]').type(
      faker.lorem.sentence({ min: 5, max: 10 })
    );
    cy.get('[data-cy="body"]').type(faker.lorem.paragraphs(1));

    cy.get('[data-cy="submit-btn"]').click();

    cy.url().should("be", "/dashboard/posts");

    cy.get('[data-cy="toast"]').should("be.visible");
  });

  it("Deletes a Blog Post", () => {
    // get the first post in the data table
    const mostRecentPost = cy.get('[data-cy="data-table-row"]').first();

    cy.get('[data-cy="delete-post"]').click();

    cy.get('[data-cy="confirm-delete"]').click();

    mostRecentPost.should("not.exist");

    cy.get('[data-cy="toast"]').should("be.visible");
  });

  it("Filters Blog Posts", () => {
    cy.get('[data-cy="filter"]').type("published");

    cy.get('[data-cy="data-table-row"]').should("have.length", 1);

    cy.get('[data-cy="filter"]').clear().type("draft");

    cy.get('[data-cy="data-table-row"]').should("have.length", 0);
  });
});
