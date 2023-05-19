// jsdom for dom manipulation
const { JSDOM } = require('jsdom'); 

function getURLsFromDom(htmlBody, baseURL) {
    const URLS = []; 
    const htmlDoc = new JSDOM(htmlBody); 
    const linkElements = htmlDoc.window.document.querySelectorAll('a'); 
    for (const link of linkElements) {
        if (link.href.slice(0,1) === "/") {
            // the page is relative.
            URLS.push(`${baseURL}${link.href}`);
        }
        else {
            URLS.push(link.href)
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
// console.log(getURLsFromDom(html, "https:/github.com")); 

/* exporting the file as module to be used in other files. */
module.exports = {
    normalizeURL, 
    getURLsFromDom
}
