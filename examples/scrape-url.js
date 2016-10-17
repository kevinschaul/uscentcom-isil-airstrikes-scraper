var csvStringify = require('csv-stringify');

var centcomScraper = require('../src/index.js');

// An example URL:
// node examples/scrape-url.js http://www.centcom.mil/MEDIA/PRESS-RELEASES/Press-Release-View/Article/970915/october-12-military-airstrikes-continue-against-isil-terrorists-in-syria-and-ir/

if (process.argv.length != 3) {
    process.stdout.write('USAGE: node scrape-url.js URL\n');
    return;
}

var url = process.argv[2];

var columns = [
    'date',
    'releaseNumber',
    'country',
    'location',
    'number',
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

centcomScraper.scrapeRelease(url, callback);
