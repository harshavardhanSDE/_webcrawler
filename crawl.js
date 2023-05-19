// prettier-ignore
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
console.log(normalizeURL("https://GITHUB.com/info/"))

/* exporting the file as module to be used in other files. */
module.exports = {
	normalizeURL
}
