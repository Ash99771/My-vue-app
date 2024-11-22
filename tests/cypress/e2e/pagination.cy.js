describe('PaginationComponent E2E Test', () => {
  before(() => {
    cy.visit('http://localhost:8083/movies');
  });

  it('should navigate to the next page', () => {
    cy.contains('Next').should('exist');

    cy.contains('Next').click();

    cy.get('.pagination-button.active').should('contain', '2');
  });
});
