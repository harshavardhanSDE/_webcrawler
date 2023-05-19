/*
crawl.test.js:
- jest is javascript library for testing.
 - jest works by looking for files that ends with ".test.js"
*/

// importing the "normalizeURL" function from crawl.js
const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");
url = "https://github.com/info";
url_ts = "https://github.com/info/";
url_big = "https://GITHUB.com/info";
url_expected = "github.com/info";

test("normalizeURL", () => {
	const inData = url;
	const processed = normalizeURL(inData);
	const outData = url_expected;
	expect(processed).toEqual(outData);
});

test("normalizeURL trailing slash checking.", () => {
	const inData = url_ts;
	const processed = normalizeURL(inData);
	const outData = url_expected;
	expect(processed).toEqual(outData);
});

test("normalizeURL for capitals.", () => {
	const inData = url_big;
	const processed = normalizeURL(inData);
	const outData = url_expected;
	expect(processed).toEqual(outData);
});
