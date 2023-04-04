const SAMPLE_INPUT = `curl 'https://graphql.github.com/graphql/proxy' \
-H 'Connection: keep-alive' \
-H 'DNT: 1' \
-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36' \
-H 'Content-Type: application/json' \
-H 'Accept: */*' \
-H 'Origin: https://graphql.github.com' \
-H 'Sec-Fetch-Site: same-origin' \
-H 'Sec-Fetch-Mode: cors' \
-H 'Sec-Fetch-Dest: empty' \
-H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
--data-binary $'{"query":"query GetRepository($name: String\u0021, $owner: String\u0021) {\\n  repository(name: $name, owner: $owner) {\\n    id\\n  }\\n}\\n","variables":{"name":"name","owner":"owner"},"operationName":"GetRepository"}' \
--compressed`;

const SAMPLE_OUTPUT_QUERY = `query GetRepository($name: String!, $owner: String!) {\n  repository(name: $name, owner: $owner) {\n    id\n  }\n}\n`;

const SAMPLE_OUTPUT_VARIABLES = `{\n  "name": "name",\n  "owner": "owner"\n}`;

describe('gqlshare.dev', () => {
	it('should load', () => {
		cy.visit('/');

		cy.contains('GraphQL Query Share').should('exist');
	});

	describe('when pasting a valid input', () => {
		beforeEach(() => {
			cy.visit('/');

			cy.get('[data-test="query-input"]')
				// @ts-ignore
				.paste(SAMPLE_INPUT);
		});

		it('should output a valid query', () => {
			cy.get('[data-test="output-query"]').should(
				'have.value',
				SAMPLE_OUTPUT_QUERY,
			);
		});

		it('should output valid variables', () => {
			cy.get('[data-test="output-variables"]').should(
				'have.value',
				SAMPLE_OUTPUT_VARIABLES,
			);
		});
	});

	describe('when loading with a valid hash', () => {
		beforeEach(() => {
			cy.visit(
				'/#vars=N4KABGBEB2CGC2BTSAuKcmQDTigewHdpEAnVfI0yEAXyAquery=I4VwpgTgngBA4mALgJTABwPYGcCWiPQAUAJAHYCGAtmAFwwDKiEOpA5gIQA0MxGA7qUh1GzNuwCUMAN4AoGDAjpseAlEIVqdMlTDd+giFv2RJs+fJwATOTAC+M+0A',
			);
		});

		it('should output a valid query', () => {
			cy.get('[data-test="output-query"]').should(
				'have.value',
				SAMPLE_OUTPUT_QUERY,
			);
		});

		it('should output valid variables', () => {
			cy.get('[data-test="output-variables"]').should(
				'have.value',
				SAMPLE_OUTPUT_VARIABLES,
			);
		});
	});
});
