describe("Login User Flow", () => {
  it("should navigate to the login page and perform a login", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="email-field"]').type("jian.yang@aviato.com");
    cy.get('[data-testid="password-field"]').type("ElrichIsDead@1234");
    cy.get('[data-testid="submit-login"]').click();
    cy.get('[data-testid="claim-grid"]')
      .children()
      .should("have.length.greaterThan", 0);
  });
});
