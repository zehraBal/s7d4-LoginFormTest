describe("Login formu testleri", () => {
  it("Başarılı form doldurulduğunda submit oluyor", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="emailInput"]').type("test@example.com");
    cy.get('[data-cy="passwordInput"]').type("Strong@123");
    cy.get('[data-cy="checkboxInput"]').check();
    cy.get('[data-cy="submitBtn"]').should("not.be.disabled").click();
    cy.url().should("eq", "http://localhost:5173/success");
  });
  it("Geçersiz email testi", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="emailInput"]').type("testexample.com");
    cy.get('[data-cy="formField"]').within(() => {
      cy.get('[data-cy="emailError"]').should("exist");
      cy.get('[data-cy="emailError"]').should(
        "contain",
        "Please enter a valid e-mail address."
      );
    });
    cy.get('[data-cy="submitBtn"]').should("be.disabled");
  });
  it("Geçersiz email ve pswd testi", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="emailInput"]').type("testexample.com");
    cy.get('[data-cy="passwordInput"]').type("test");
    cy.get('[data-cy="formField"]').within(() => {
      cy.get('[data-cy="emailError"]').should("exist");
      cy.get('[data-cy="emailError"]').should(
        "contain",
        "Please enter a valid e-mail address."
      );
      cy.get('[data-cy="pswdError"]').should("exist");
      cy.get('[data-cy="pswdError"]').should(
        "contain",
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
      );
    });
    cy.get('[data-cy="submitBtn"]').should("be.disabled");
  });
  it("Email ve password doğru ancak şartlar kabul edilmemiş", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="emailInput"]').type("test@example.com");
    cy.get('[data-cy="passwordInput"]').type("Strong@123");
    cy.get('[data-cy="checkboxInput"]').check();
    cy.get('[data-cy="checkboxInput"]').uncheck();
    cy.get('[data-cy="checkError"]').should("exist");
    cy.get('[data-cy="checkError"]').should(
      "contain",
      "You must accept the terms"
    );
    cy.get('[data-cy="submitBtn"]').should("be.disabled");
  });
});
