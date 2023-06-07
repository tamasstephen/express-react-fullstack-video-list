describe("template spec", () => {
  it("passes", () => {
    cy.visit(`${process.env.NEXT_PUBLIC_API}`);
  });
});
