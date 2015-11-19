var csvStringify = require('csv-stringify');
var scrapeCache = require('scrape-cache');

var columns = [
    'title',
    'url'
];
// Write header row
process.stdout.write(columns.join(',') + '\n');
var callback = function(results) {
    csvStringify(results, {columns: columns}, function(err, output) {
            process.stdout.write(output);
        }
    );
};

// Find relevant URLs
// CENTCOM's press releases area uses the path "Pn" to display the n-th most
// recent press release. Six releases are shown on each page.

// Get press release links from http://www.centcom.mil/en/news/P0
var scraper = function($) {
    var releases = $('.contentpagetitle');
    return releases.map(function(i, elem) {
        var $this = $(this);
        return {
            title: $this.text(),
            url: 'http://www.centcom.mil' + $this.attr('href')
        };
    // `get()` is a cheerio-thing to remove cheerio properties, as seen in this
    // example:
    // https://github.com/cheeriojs/cheerio#map-functionindex-element-
    }).get();
};

var saveMatches = function(result) {
    var filtered = result.filter(function(link) {
        var match = link.title.match(/strikes.+continue.+ISIL.+/i);
        return match;
    });
    callback(filtered);
};

// Cycle through these pages, collecting the relevant links
//
// `oldestNWeCareAbout` should be set to the number where Dec. 18 starts. This
// will change as more press releases happen.
//var oldestNWeCareAbout = 599;

var interval;
var n = 0;
var oldestNWeCareAbout = 599;
var tick = function() {
    if (n > oldestNWeCareAbout) {
        clearInterval(interval);
    }

    var url = 'http://www.centcom.mil/en/news/P' + n;
    scrapeCache.scrape(url, scraper, saveMatches);

    n += 5;
};

interval = setInterval(tick, 10);
