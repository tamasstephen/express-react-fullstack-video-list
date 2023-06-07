/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("REGISTER"));
    cy.get('[data-cy="email"]').as("email");
    cy.get('[data-cy="username"]').as("username");
    cy.get('[data-cy="password"]').as("password");
    cy.get('[data-cy="submit"]').as("submit");
  });

  it("should display the registration page", () => {
    cy.get("@email").should("exist");
    cy.get("@username").should("exist");
    cy.get("@password").should("exist");
    cy.get("@submit").should("exist");
  });

  it("should have proper values after input", () => {
    cy.get("@email").type("email@email.com");
    cy.get("@email").should("have.value", "email@email.com");
    cy.get("@username").type("username");
    cy.get("@username").should("have.value", "username");
    cy.get("@password").type("password");
    cy.get("@password").should("have.value", "password");
  });

  it("should fire submit function with valid input value", () => {
    cy.intercept("POST", `${Cypress.env("API")}/register`, {
      statusCode: 200,
      body: {
        user: {
          name: "username",
        },
      },
    }).as("myRegistration");
    cy.get("@email").type("email@email.com");
    cy.get("@email").should("have.value", "email@email.com");
    cy.get("@username").type("username");
    cy.get("@username").should("have.value", "username");
    cy.get("@password").type("password");
    cy.get("@password").should("have.value", "password");
    cy.get("@submit").click();
    cy.wait("@myRegistration")
      .its("response.body")
      .should("have.a.property", "user");
  });

  it("should require an email", () => {
    cy.get("@submit").click();

    cy.get('[data-cy="error-bar"]').should("be.visible");
    cy.get('[data-cy="error-bar"]').should("contain", "email");
  });

  it("should require a username", () => {
    cy.get("@email").type("valid@email.com");
    cy.get("@password").type("password");
    cy.get("@submit").click();
    cy.get('[data-cy="error-bar"]').should("be.visible");
  });

  it("should require a password", () => {
    cy.get("@email").type("valid@email.com");
    cy.get("@username").type("username");
    cy.get("@submit").click();
    cy.get('[data-cy="error-bar"]').should("be.visible");
  });

  it("should require proper email format", () => {
    cy.get("@email").type("email");

    cy.get("@submit").click();

    cy.get('[data-cy="email"]:invalid')
      .invoke("prop", "validationMessage")
      .should("contain", "email");

    cy.get('[data-cy="email"]:invalid')
      .invoke("prop", "validity")
      .its("typeMismatch")
      .should("be.true");
  });
});
