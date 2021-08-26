describe('gqlshare.dev', () => {
	it('should load', () => {
		cy.visit('/');

		cy.contains('GraphQL Query Share').should('exist');
	});
});
