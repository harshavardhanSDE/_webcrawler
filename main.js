const { crawl } = require("./crawl.js");

function main() {
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
		const baseURL = process.argv[2];
		crawl(baseURL);
	}
}
main();
