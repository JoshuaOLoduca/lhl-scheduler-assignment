describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
    cy.get("body").should("contain", "Monday");
  });
});
