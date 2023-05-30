/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('[data-cy="email"]').as("email");
    cy.get('[data-cy="password"]').as("password");
    cy.get('[data-cy="submit"]').as("submit");
  });

  it("should display the login page", () => {
    cy.get("@email").should("exist");
    cy.get("@password").should("exist");
    cy.get("@submit").should("exist");
  });

  it("should have proper values after input", () => {
    cy.get("@email").type("email@email.com");
    cy.get("@email").should("have.value", "email@email.com");
    cy.get("@password").type("password");
    cy.get("@password").should("have.value", "password");
  });

  it("should fire submit function with valid input value", () => {
    cy.intercept("POST", "http://localhost:3001/login", {
      statusCode: 200,
      body: {
        user: {
          name: "username",
        },
      },
    }).as("myLogin");
    cy.get("@email").type("email@email.com");
    cy.get("@email").should("have.value", "email@email.com");
    cy.get("@password").type("password");
    cy.get("@password").should("have.value", "password");
    cy.get("@submit").click();
    cy.wait("@myLogin").its("response.body").should("have.a.property", "user");
  });

  it("should require an email", () => {
    cy.get("@submit").click();

    cy.get('[data-cy="error-bar"]').should("be.visible");
    cy.get('[data-cy="error-bar"]').should("contain", "email");
  });

  it("should require a password", () => {
    cy.get("@email").type("valid@email.com");
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
