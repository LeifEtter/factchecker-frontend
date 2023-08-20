describe("Login User", () => {
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

describe("Register User", () => {
  it("should navigate to create claim page, fill info and submit", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="switch-to-register"]').click();

    cy.get('[data-testid="name-field"]').type("Jian Yang");
    cy.get('[data-testid="email-field"]').type("jian.yang3@aviato.com");
    cy.get('[data-testid="password-field"]').type("ElrichIsDead@1234");
    cy.get('[data-testid="repeat-password-field"]').type("ElrichIsDead@1234");

    cy.get('[data-testid="submit-registration"]').click();
  });
});

describe("Create Claim", () => {
  it("should navigate to create claim page, enter data and submit", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="create-claim-button"]').click();
    cy.get('[data-testid="claim-input"]').type(
      "Goldfish can only remember up to 3 seconds"
    );
    cy.get('[data-testid="description-input"]').type(
      "Research shows, that goldfish can only remember up to 3 seconds of information"
    );
    cy.get('[data-testid="source-input"]').type("Common Knowledge");
  });
});
