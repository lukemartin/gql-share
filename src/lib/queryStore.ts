import { writable, derived } from 'svelte/store';
import { parseQuery } from './utils';

export const queryInput = writable('');

export const output = derived(queryInput, ($queryInput) => parseQuery($queryInput));

export const searchOutput = writable({ query: '', variables: '' });
