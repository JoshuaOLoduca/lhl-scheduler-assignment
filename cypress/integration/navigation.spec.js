beforeEach(() => {
  cy.visit("/");
});

describe("Navigation", () => {
  it("should visit root", () => {});

  it("should navigate to tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
