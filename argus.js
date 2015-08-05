var casper = require('casper').create({
    logLevel: "debug",
    debug: true,
    verbose: false,
});

var links;
var url;
var linkCounter = 0;
var brokenLinkCount = 0;
var url_regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

function getLinks() {
    links = document.getElementsByTagName('a');
    return Array.prototype.map.call(links, function(e) {
        var href = e.getAttribute('href');
        var a = document.createElement('a');
        a.href = href;
        return {href: a.href, text: e.text};
    });
}

if (casper.cli.has('url')) {
    url = casper.cli.get('url');
} else if (casper.cli.has(0)) {
    url = casper.cli.get(0);
} else {
    console.log("I need an URL to test!");
    console.log("casperjs argus.js <URL> or --url=<URL>");
    casper.exit();
}

if (url_regex.test(url)) {
    console.log("Checking...", url);
} else {
    console.log("URL seemed malformed.")
    casper.exit();
}

casper.on("resource.error", function(resourceError){
    console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
    console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
});

casper.start(url);

casper.then(function(){
    links = this.evaluate(getLinks);
    console.log("Found " + links.length + " link(s).");
    casper.eachThen(links, function(link){
        linkCounter++;
        var followLink = link.data['href'];
        var text = link.data['text'].trim();
        if (followLink) {
            this.thenOpen(followLink, function(resp){
                if (resp == undefined || resp.status >= 400) {
                    brokenLinkCount++;
                    console.log('\033[31m ❌ ', linkCounter + ") BROKEN LINK: " + followLink + " !!!\x1b[0m");
                } else {
                    console.log("\033[32m ✓ \x1b[0m", linkCounter + ") " + followLink + " (" + text + " - " + resp.status + ")");
                }
            });
        }
    });
});

casper.run(function(){
    if (links.length == 0) {
        console.log("No links found...");
    } else {
        console.log("Done! Crawled", links.length, "links. Broken:", brokenLinkCount);
    }

    this.exit();
});

