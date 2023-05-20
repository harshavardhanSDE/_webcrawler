const { crawl } = require("./crawl.js");

async function main() {
	if (process.argv.length < 3) {
		console.log("No input found! ");
		process.exit(1);
	}
	if (process.argv.length > 3) {
		console.log("More than valid amount of inputs.");
		process.exit(1);
	} else {
		console.log("crawling started.");
		const crawlURL = process.argv;
		console.log(`crawling at ${crawlURL}`);
		// Explantion: for ln.16 in dev-doc.md: ln.56
		const baseURL = process.argv[2];
		// the return type of crawl function is an "object"
		const pages = await crawl(baseURL, baseURL, {});
		console.log(pages);
	}
}
main();
