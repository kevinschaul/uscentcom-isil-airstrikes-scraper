var csvStringify = require('csv-stringify');
var csvParse = require('csv-parse');
var fs = require('fs');
var scrapeCache = require('scrape-cache');

var centcomScraper = require('../src/index.js');

if (process.argv.length != 3) {
    process.stdout.write('USAGE: node scrape-all.js URLS_FILE\n');
    return;
}

var urls_file = process.argv[2];

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

var contents = fs.readFileSync(urls_file, 'utf8');
csvParse(contents, {columns: true}, function(err, rows) {
    var interval;
    var i = 0;
    var tick = function() {
        if (i > rows.length) {
            clearInterval(interval);
        }

        if (rows[i]) {
            centcomScraper.scrapeRelease(rows[i].url, callback, rows[i]);
        }

        i++;
    };
    interval = setInterval(tick, 0);
});
