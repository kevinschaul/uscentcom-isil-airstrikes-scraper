var csvStringify = require('csv-stringify');
var scrapeCache = require('scrape-cache');

var centcomScraper = require('../src/index.js');

var columns = [
    'date',
    'releaseNumber',
    'country',
    'location',
    'number',
    'title',
    'url',
    'description'
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

// Cycle through these pages, collecting the relevant links
//
// `oldestNWeCareAbout` should be set to the number where Dec. 18 starts. This
// will change as more press releases happen.
//var oldestNWeCareAbout = 599;
var oldestNWeCareAbout = 599;

var strikeURLs = {};

var scrapeMatches = function(result) {
    result.forEach(function(link) {
        var match = link.title.match(/strikes.+continue.+ISIL.+/);
        if (match) {
            strikeURLs[link.title] = link.url;
            centcomScraper.scrapeRelease(link.url, callback, link);
        }
    });
};

var n;
for (n = 0; n <= oldestNWeCareAbout; n += 5) {
    var url = 'http://www.centcom.mil/en/news/P' + n;
    scrapeCache.scrape(url, scraper, scrapeMatches);
}

//var startDate = moment('2014-12-18');
//var endDate = moment();

//while (startDate <= endDate) {
    //centcomScraper.scrapeReleaseFromDate(startDate.toDate(), callback, {dateFormatted: startDate.format('MM-DD-YYYY')});
    //startDate.add(1, 'd');
//}
