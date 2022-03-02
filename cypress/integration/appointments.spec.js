beforeEach(() => {
  // Resetting test DB
  cy.request("GET", "/api/debug/reset");
  // Directing cypress to homepage
  cy.visit("/");
  // checking for page load
  cy.contains("Monday");
});

describe("Appointmens", () => {
  it("should book an interview", () => {
    const studentName = "Ted Mosby";
    // Finding and clicking add interview button
    cy.get("[alt=Add]").first().click();
    cy.get("[placeholder='Enter Student Name']").type(studentName);

    // Geting and selecting Interviewer
    cy.get(".interviewers li").first().as("interviewer");
    cy.get("@interviewer")
      .click()
      .should("have.class", "interviewers__item--selected");

    // Checking for save indicator
    cy.contains("Save").click();
    cy.get(".appointment__status-image").should(
      "have.attr",
      "src",
      "images/status.png"
    );

    // Checking to see if appointment was added
    cy.contains(studentName);
  });

  it("should edit an interview", () => {
    const newStudentName = "Crchie Aohen";

    // Checking for initial interviewer
    cy.contains("Sylvia Palmer");

    // Clicking the first edit button
    cy.get("section.schedule").find("[alt=Edit]").click({ force: true });

    // Changing students name
    cy.get("[data-testid=student-name-input]").clear().type(newStudentName);

    // Selecting new interviewer
    cy.get("ul.interviewers__list li").last().click();

    cy.contains("Save").click();
    cy.get(".appointment__status-image").should(
      "have.attr",
      "src",
      "images/status.png"
    );

    // Checking to see if appointment was Edited
    cy.contains(newStudentName);
    cy.contains("Tori Malcolm");
  });

  it.only("should cancel an interview", () => {
    // Clicking the first Delete button
    cy.get("section.schedule").find("[alt=Delete]").click({ force: true });

    // Clicking Confirm Button
    cy.contains("Confirm").click();

    // Verifying status bar is visable
    cy.contains("Deleting");
    cy.get(".appointment__status-image").should(
      "have.attr",
      "src",
      "images/status.png"
    );

    // Checking to see if appointment was Deleted
    cy.should("not.contain", "Archie Cohen");
    cy.should("not.contain", "Sylvia Palmer");
  });
});
