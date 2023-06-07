describe("SingleVideoPage", () => {
  it("displays video details after successful API call", () => {
    cy.visit(Cypress.env("SINGLE_VIDEO"));
    cy.intercept(
      "GET",
      `${Cypress.env(
        "API"
      )}/api/video/7d632aa1-7c3a-4c65-96cf-543983053b82/data`
    ).as("getVideoData");
    cy.wait("@getVideoData").then(() => {
      // Assuming the video details are displayed in the component
      cy.get("[data-cy='title']").should("exist");
      cy.get("[data-cy='description']").should("exist");
      cy.get("[data-cy='video-user-name']").should("exist");
      cy.get("[data-cy='likes']").should("exist");
    });
  });

  it("displays an error message when API call fails", () => {
    cy.visit(Cypress.env("SINGLE_VIDEO_ERROR"));
    cy.intercept("GET", `${Cypress.env("API")}/api/video/error-video/data`).as(
      "getVideoDataWithError"
    );

    cy.wait(5000).then(() => {
      cy.get("[data-cy='video-error']").should("exist");
    });
  });
});
