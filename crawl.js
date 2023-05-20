// jsdom for dom manipulation
const { JSDOM } = require('jsdom'); 
// pages: object
async function crawl(baseURL, currentCrawlUrl, pages) {
    
    const baseURLobj = new URL(baseURL); 
    const currentCrawlUrlObj = new URL(currentCrawlUrl)
    // checking if the page is of same website.
    if (currentCrawlUrlObj.hostname !== baseURLobj.hostname) {
        return pages; 
    }
    // checking if the link already exits.
    const normalizedURL = normalizeURL(currentCrawlUrlObj); 
    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++; 
        return pages; 
    }
    // if the link is not present initialize it to 1. 
    pages[normalizedURL] = 1; 
    console.log(`crawling the site ${normalizedURL}`); 

    // checking for status error.
    try {
        const response = await fetch(currentCrawlUrl); 
        if (response.status > 399) {
            console.log(` Status error: code -> ${response.status}`); 
            return pages
        }
        // checking for type error. 
        const responseType = response.headers.get('content-type'); 
        if (!responseType.includes('text/html')) {
            console.log(`Content error: received -> ${responseType}`); 
            return pages; 
        }
        const htmlBody = await response.text(); 
        const urlsFromBody = getURLsFromDom(htmlBody, baseURL); 
        for (const nextUrl of urlsFromBody) {
            pages = await crawl(baseURL, nextUrl, pages)
        }
    }
    catch (err) {
        console.log(err.message); 
    }
    return pages; 
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

	// const html = `
	// <html>
	// 	<body>
	// 		<a href="https://github.com/user/contributions/">
	// 		Contributions
	// 		</a>
	// 	</body>
	// </html>
	// `;

    //console.log(getURLsFromDom(html, "https://github.com")); 

    /* exporting the file as module to be used in other files. */
module.exports = {
    normalizeURL, 
    getURLsFromDom, 
    crawl
}
