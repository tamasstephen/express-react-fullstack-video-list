describe("SingleVideoPage", () => {
  beforeEach(() => {
    cy.visit(
      `${process.env.NEXT_PUBLIC_API}/video/7d632aa1-7c3a-4c65-96cf-543983053b82`
    );
    cy.intercept("GET", `${process.env.NEXT_PUBLIC_API}/api/video/*/data`, {
      fixture: "video.json",
    }).as("getVideoData");
  });

  it("displays video details after successful API call", () => {
    cy.visit("/path/to/single-video-page");

    cy.wait("@getVideoData").then(() => {
      cy.get(".loading-spinner").should("not.exist"); // Assuming there's a loading spinner with the class 'loading-spinner'

      // Assuming the video details are displayed in the component
      cy.get(".video-title").should("contain", "Video Title");
      cy.get(".video-description").should("contain", "Video Description");
      cy.get(".user-initials").should("contain", "JD");
      cy.get(".user-name").should("contain", "John Doe");
    });
  });

  it("displays an error message when API call fails", () => {
    cy.intercept("GET", `${process.env.NEXT_PUBLIC_API}/api/video/*/data`, {
      statusCode: 500,
      body: "Internal Server Error",
    }).as("getVideoDataWithError");

    cy.visit("/path/to/single-video-page");

    cy.wait("@getVideoDataWithError").then(() => {
      cy.get(".loading-spinner").should("not.exist"); // Assuming there's a loading spinner with the class 'loading-spinner'
      cy.get(".error-message").should(
        "contain",
        "Error: Internal Server Error"
      );
    });
  });
});
