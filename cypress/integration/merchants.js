/// <reference types="cypress" />

describe("Merchants", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("initial render", () => {
    cy.get('[data-value="Katelynn"]').should("exist");
  });

  it("merchant list next page prev page", () => {
    cy.get('[data-value="Katelynn"]').should("exist");
    cy.get('[title="Next page"]').click();
    cy.get('[data-value="Katelynn"]').should("not.exist");
    cy.get('[data-value="Lacy"]').should("exist");
    cy.get('[title="Previous page"]').click();
    cy.get('[data-value="Lacy"]').should("not.exist");
    cy.get('[data-value="Katelynn"]').should("exist");
  });

  it("create new merchant", () => {
    cy.get('[aria-label="create"]').click();
    cy.get("#avatarUrl").attachFile("avatarUrl.svg");
    cy.get("#firstname").type("John");
    cy.get("#lastname").type("Snow");
    cy.get("#email").type("John.snow@gmail.com");
    cy.get("#phone").type("123-456-789");
    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByRole("alert", { timeout: 10000 }).should("be.visible");
  });

  it("edit merchant", () => {
    cy.get(".MuiDataGrid-window").scrollTo(500, 0);
    cy.get("[aria-label=edit-0] > .MuiSvgIcon-root").click();
    cy.get("#firstname").type("123");
    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByRole("alert", { timeout: 10000 }).should("be.visible");
  });

  it("delete merchant", () => {
    cy.get(".MuiDataGrid-window").scrollTo(500, 0);
    cy.get("[aria-label=delete-0] > .MuiSvgIcon-root").click();
    cy.findByRole("button", { name: /yes/i }).click();
    cy.findByRole("alert", { timeout: 10000 }).should("be.visible");
  });

  it("show details", () => {
    cy.get('[data-value="Katelynn"]').should("exist");
    cy.get("[data-testid=bids-0] > .MuiSvgIcon-root").click();
    cy.get('[data-value="Katelynn"]').should("not.exist");
    cy.get('[data-value="592.85"]').should("exist");
  });

  it("show details and back to marchant", () => {
    cy.get("[data-testid=bids-0] > .MuiSvgIcon-root").click();
    cy.get('[data-value="592.85"]').should("exist");
    cy.get('[aria-label="back"]').click();
    cy.get('[data-value="592.85"]').should("not.exist");
    cy.get('[data-value="Katelynn"]').should("exist");
  });

  it("show details next page prev page", () => {
    cy.get("[data-testid=bids-0] > .MuiSvgIcon-root").click();
    cy.get('[data-value="592.85"]').should("exist");
    cy.get('[title="Next page"]').click();
    cy.get('[data-value="592.85"]').should("not.exist");
    cy.get('[data-value="Taurus"]').should("exist");
    cy.get('[title="Previous page"]').click();
    cy.get('[data-value="887.42"]').should("not.exist");
    cy.get('[data-value="592.85"]').should("exist");
  });
});
