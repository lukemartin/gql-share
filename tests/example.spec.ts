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

const JSON_TEST_EXPECTED_VARIABLES = `{
	"orgId": 15,
	"searchPattern": "232f1350ff01 "
  }`;

const JSON_TEST_EXPECTED_QUERY = `query GetSuggestions($orgId: ID!, $searchPattern: String!, $contentTypeIds: [ID!]) {
	organization(id: $orgId) {
	  id
	  fieldUniverse {
		suggestCompletionV2(
		  searchPattern: $searchPattern
		  contentTypeIds: $contentTypeIds
		  limit: 10
		) {
		  ...AutoCompleteFragment
		  __typename
		}
		__typename
	  }
	  __typename
	}
  }
  
  fragment AutoCompleteFragment on FieldValueCompletionSuggestion {
	suggestion
	field {
	  key
	  ... on ClientField {
		name
		fieldFriendlyName
		friendlyName
		contentType {
		  id
		  name
		  __typename
		}
		__typename
	  }
	  ... on GenericField {
		name
		friendlyName
		contentType {
		  id
		  name
		  __typename
		}
		__typename
	  }
	  ... on ProductLineCustomField {
		name
		friendlyName
		__typename
	  }
	  ... on EnrichmentField {
		name
		friendlyName
		__typename
	  }
	  ... on BaseSystemFieldInterface {
		name
		friendlyName
		__typename
	  }
	  ... on RiskSystemField {
		name
		friendlyName
		__typename
	  }
	  __typename
	}
	__typename
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

	test.describe('gqlshare.dev JSON test', () => {
		test('when pasting a valid JSON input, it should output the correct query & variables', async ({ page }) => {
			await page.goto('/');

			// Define the input specific to the JSON test
			const JSON_TEST_INPUT = JSON.stringify({
				operationName: "GetSuggestions",
				variables: {
					orgId: 15,
					searchPattern: "232f1350ff01 "
				},
				query: JSON_TEST_EXPECTED_QUERY
			});

			// Paste the JSON test input into the textbox
			await page.getByRole('textbox').fill(JSON_TEST_INPUT);

			// Check if the correct query is displayed
			await expect(page.getByRole('code').first()).toHaveText(JSON_TEST_EXPECTED_QUERY);

			// Check if the correct variables are displayed
			await expect(page.getByRole('code').last()).toHaveText(JSON_TEST_EXPECTED_VARIABLES);
		});
	});
});
