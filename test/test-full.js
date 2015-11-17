var fs = require('fs');

var centcomScraper = require('../src/index.js');

exports.fetchRelease = {
    nov2: function(test) {
        var url = 'http://www.centcom.mil/en/news/articles/nov.-2-military-airstrikes-continue-against-isil-terrorists-in-syria-and-ir';

        var expected = fs.readFileSync('./test/release/nov2.txt', 'utf8');

        var callback = function(results) {
            test.equal(expected, results);
            test.done();
        };

        centcomScraper.fetchRelease(url, callback);
    }
};
