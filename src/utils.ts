const prettyJson = (object: any = {}): string =>
	JSON.stringify(object, null, 2);

export { prettyJson };
