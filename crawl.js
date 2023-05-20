// jsdom for dom manipulation
const { JSDOM } = require('jsdom'); 

async function crawl(toCrawlUrl) {
    console.log(`crawling the site ${toCrawlUrl}`); 
    try {
        const response = await fetch(toCrawlUrl); 
        if (response.status > 399) {
            console.log(response.status); 
            return 
        }
        console.log(await response.text())
    }
    catch (err) {
        console.log(err.message); 
    }
}

function getURLsFromDom(htmlBody, baseURL) {
    const URLS = []; 
    const htmlDoc = new JSDOM(htmlBody); 
    const linkElements = htmlDoc.window.document.querySelectorAll('a'); 
    for (const link of linkElements) {
        if (link.href.slice(0,1) === "/") {
            // the page is relative.
            try {
                const testUrl = new URL(`${baseURL}${link.href}`);
                URLS.push(testUrl.href);
            }
            catch (err) {
                console.log(`broken URL: ${err.message}`); 
            }
        }
        else {
            try {
                const testUrl = new URL(`${link.href}`); 
                URLS.push(testUrl.href); 
            }
            catch (err) { 
                console.log(`broken URL: ${err.message}`); 
            }
        } 
    }
    return URLS; 
}
/*
function: normalizeURL()
    - Returns the url string.
*/
function normalizeURL(urlString) {
    const URLobject = new URL(urlString);
    // hostname: github.com, pathname: anything follows github.com/
    const processedURL = `${URLobject.hostname}${URLobject.pathname}`;
    if (processedURL.length > 0 && processedURL.slice(-1) === '/'){
        return processedURL.slice(0, -1);
    }
    return processedURL; 

}

	const html = `
	<html>
		<body>
			<a href="https://github.com/user/contributions/">
			Contributions
			</a>
		</body>
	</html>
	`;

//console.log(getURLsFromDom(html, "https://github.com")); 

/* exporting the file as module to be used in other files. */
module.exports = {
    normalizeURL, 
    getURLsFromDom, 
    crawl
}
