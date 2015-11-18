var csvStringify = require('csv-stringify');
var moment = require('moment');

var centcomScraper = require('../src/index.js');

var columns = [
    'dateFormatted',
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

var startDate = moment('2014-12-18');
var endDate = moment();

while (startDate <= endDate) {
    centcomScraper.scrapeReleaseFromDate(startDate.toDate(), callback, {dateFormatted: startDate.format('MM-DD-YYYY')});
    startDate.add(1, 'd');
}
