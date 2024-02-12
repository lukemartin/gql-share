import { test, expect } from '@playwright/test';

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

const COMPLEX_EXPECTED_QUERY = `query GetItem($itemId: ID!, $categoryFilter: String, $reviewRating: Int, $manufacturerLocation: String) {
	item(id: $itemId) {
	  id
	  name
	  description
	  categories(filter: $categoryFilter) {
		id
		name
	  }
	  manufacturer(location: $manufacturerLocation) {
		id
		name
		location
	  }
	  reviews(minRating: $reviewRating) {
		rating
		text
		reviewer {
		  id
		  name
		}
	  }
	}
  }`;

const COMPLEX_EXPECTED_VARIABLES = `{
	"itemId": 42,
	"categoryFilter": "Electronics",
	"reviewRating": 4,
	"manufacturerLocation": "Japan"
  }`;

test.describe('gqlshare.dev', () => {
	test('should load', async ({ page }) => {
		await page.goto('/');

		await expect(page).toHaveTitle(/gqlshare/);
	});

	test.describe('when pasting a valid input', () => {
		test('it should output a valid query & variables', async ({ page }) => {
			await page.goto('/');

			await page.getByRole('textbox').fill(SAMPLE_INPUT);

			await expect(page.getByRole('code').first()).toHaveText(SAMPLE_OUTPUT_QUERY);
			await expect(page.getByRole('code').last()).toHaveText(SAMPLE_OUTPUT_VARIABLES);
		});
	});

	test.describe('when loading a shared query', () => {
		test('it should output a valid query & variables', async ({ page }) => {
			await page.goto(
				'/?query=I4VwpgTgngBA4mALgJTABwPYGcCWiPQAUAJAHYCGAtmAFwwDKiEOpA5gIQA0MxGA7qUh1GzNuwCUMAN4AoGDAjpseAlEIVqdMlTDd+giFv2RJs+fJwATOTAC+M+0A&vars=N4KABGBEB2CGC2BTSAuKcmQDTigewHdpEAnVfI0yEAXyA'
			);

			await page.getByRole('textbox').fill(SAMPLE_INPUT);

			await expect(page.getByRole('code').first()).toHaveText(SAMPLE_OUTPUT_QUERY);
			await expect(page.getByRole('code').last()).toHaveText(SAMPLE_OUTPUT_VARIABLES);
		});
	});

	test.describe('when loading a shared query in the old format', () => {
		test('it should redirect to the new format', async ({ page }) => {
			await page.goto(
				'/#vars=N4KABGBEB2CGC2BTSAuKcmQDTigewHdpEAnVfI0yEAXyAquery=I4VwpgTgngBA4mALgJTABwPYGcCWiPQAUAJAHYCGAtmAFwwDKiEOpA5gIQA0MxGA7qUh1GzNuwCUMAN4AoGDAjpseAlEIVqdMlTDd+giFv2RJs+fJwATOTAC+M+0A'
			);

			await expect(page.url()).toContain(
				'/?query=I4VwpgTgngBA4mALgJTABwPYGcCWiPQAUAJAHYCGAtmAFwwDKiEOpA5gIQA0MxGA7qUh1GzNuwCUMAN4AoGDAjpseAlEIVqdMlTDd+giFv2RJs+fJwATOTAC+M+0A&vars=N4KABGBEB2CGC2BTSAuKcmQDTigewHdpEAnVfI0yEAXyA'
			);
		});
	});

	test('when pasting a valid JSON input, it should output the correct complex query & variables with filters', async ({
		page
	}) => {
		await page.goto('/');

		// Define the input for the complex JSON test with filters
		const JSON_TEST_INPUT = JSON.stringify({
			operationName: 'GetItem',
			variables: {
				itemId: 42,
				categoryFilter: 'Electronics',
				reviewRating: 4,
				manufacturerLocation: 'Japan'
			},
			query: COMPLEX_EXPECTED_QUERY
		});

		// Paste the JSON test input into the textbox
		await page.getByRole('textbox').fill(JSON_TEST_INPUT);

		// Check if the correct complex query with filters is displayed
		await expect(page.getByRole('code').first()).toHaveText(COMPLEX_EXPECTED_QUERY);

		// Check if the correct variables with filters are displayed
		await expect(page.getByRole('code').last()).toHaveText(COMPLEX_EXPECTED_VARIABLES);
	});
});
