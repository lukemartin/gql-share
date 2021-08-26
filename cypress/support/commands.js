// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * @param text: text to be pasted in
 */
// https://github.com/cypress-io/cypress/issues/1123#issuecomment-672640129
Cypress.Commands.add(
	'paste',
	{
		prevSubject: true,
		element: true,
	},
	($element, text) => {
		cy.get($element)
			.click()
			.then(() => {
				$element.text(text);
				$element.val(text);
				cy.get($element).type(' {backspace}');
			});
	},
);
