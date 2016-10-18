var csvStringify = require('csv-stringify');
var scrapeCache = require('scrape-cache');

var centcomScraper = require('../src/index.js');

var columns = [
    'date',
    'country',
    'location',
    'number',
    'description',
    'line'
];

// Write header row
process.stdout.write(columns.join(',') + '\n');
var callback = function(results) {
    csvStringify(results, {columns: columns}, function(err, output) {
            process.stdout.write(output);
        }
    );
};

var getReleasesHTML = function($) {
    // Convert p and br tags into newlines
    // http://stackoverflow.com/questions/3381331/jquery-convert-br-and-br-and-p-and-such-to-new-line
    $.fn.br2nl = function() {
        return this.each(function(i) {
            var $this = $(this);

            // Strip existing newlines
            $this.html($this.html().replace(/[\r|\n]/mg, ' '));

            // Convert tags to newlines
            $this.html($this.html().replace(/(<br[^>]*>)|(<br \/>)|(<p>)|(<\/p>)|(<ul>)|(<\/ul>)|(<li>)|(<\/li>)/g, '\n'));
        });
    };

    // Given a cheerio selection of an element, return its contents into an
    // array of text lines
    var getLines = function($el) {
        var lines = $el.br2nl().text().split('\n');
        return lines.map(function(d) {
            return d.trim();
        }).filter(function(d) {
            return d !== '';
        });
    };

    var releases = $('.airstrikeInfo ul.entries > li');
    return releases.map(function(i, elem) {
        var $this = $(this);

        return {
            date: $this.find('.date').text().trim(),
            title: $this.find('h3').text().trim(),
            contents: getLines($this.find('.countryfull'))
        };

    // `get()` is a cheerio-thing to remove cheerio properties, as seen in this
    // example:
    // https://github.com/cheeriojs/cheerio#map-functionindex-element-
    }).get();
};

// All relevant releases are combined into a modal that appears when clicking
// on "Syria" or "Iraq" in the map on the page. Luckily all the releases exist
// in the HTML on the page.
var url = 'http://www.defense.gov/News/Special-Reports/0814_Inherent-Resolve';
scrapeCache.scrape(url, getReleasesHTML, function(result) {
    var strikes = centcomScraper.parseReleaseLines(result);

    csvStringify(strikes, {columns: columns}, function(err, output) {
        process.stdout.write(output);
    });
});

