/*
crawl.test.js:
- jest is javascript library for testing.
 - jest works by looking for files that ends with ".test.js"
*/

// importing the "normalizeURL" function from crawl.js
const { normalizeURL, getURLsFromDom } = require("./crawl.js");
const { test, expect } = require("@jest/globals");
url = "https://GitHub.com/info/";
url_expected = "github.com/info";

test("normalizeURL", () => {
	const inData = url;
	const processed = normalizeURL(inData);
	const outData = url_expected;
	expect(processed).toEqual(outData);
});

test("normalizeURL: trailing slash", () => {
	const inData = url;
	const processed = normalizeURL(inData);
	const outData = url_expected;
	expect(processed).toEqual(outData);
});

test("normalizeURL: capitals.", () => {
	const inData = url;
	const processed = normalizeURL(inData);
	const outData = url_expected;
	expect(processed).toEqual(outData);
});

test("normalizeURL: stripping http", () => {
	const inData = url;
	const processed = normalizeURL(inData);
	const outData = url_expected;
	expect(processed).toEqual(outData);
});

// testing for html dom extraction

test("getURLsFromDom: absolute path", () => {
	const html = `
	<html>
		<body>
			<a href="https://github.com/user/contributions/">
			Contributions
			</a>
		</body>
	</html>
	`;
	const baseURL = "https://github.com";
	const urlFromDom = getURLsFromDom(html, baseURL);
	const absoluteUrl = ["https://github.com/user/contributions/"];
	expect(urlFromDom).toEqual(absoluteUrl);
});

test("getURLsFromDom: relative path", () => {
	const html = `
	<html>
		<body>
			<a href="/user/contributions/">
			Contributions
			</a>
		</body>
	</html>
	`;
	const baseURL = "https://github.com";
	const urlFromDom = getURLsFromDom(html, baseURL);
	const absoluteUrl = ["https://github.com/user/contributions/"];
	expect(urlFromDom).toEqual(absoluteUrl);
});
