var fs = require('fs');

var centcomScraper = require('../src/index.js');

exports.getURL = {
    jan16: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 0, 16);
        var expected = 'http://www.centcom.mil/en/news/articles/jan.-16-military-airstrikes-continue-against-isil-in-syria-and-iraq';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    },
    feb19: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 1, 19);
        var expected = 'http://www.centcom.mil/en/news/articles/feb.-19-military-airstrikes-continue-against-isil-in-syria-and-iraq';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    },
    march26: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 2, 26);
        var expected = 'http://www.centcom.mil/en/news/articles/march-26-military-airstrikes-continue-against-isil-in-syria-and-iraq';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    },
    april28: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 3, 28);
        var expected = 'http://www.centcom.mil/en/news/articles/april-28-military-airstrikes-continue-against-isil-in-syria-and-iraq';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    },
    may9: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 4, 9);
        var expected = 'http://www.centcom.mil/en/news/articles/may-9-military-airstrikes-continue-against-isil-in-syria-and-iraq';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    },
    may13: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 4, 13);
        var expected = 'http://www.centcom.mil/en/news/articles/may-13-military-airstrikes-continue-against-isil-terrorists-in-syria-and-ir';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    },
    may29: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 4, 29);
        var expected = 'http://www.centcom.mil/en/news/articles/may-29-military-airstrikes-continue-against-isil-terrorists-in-syria-and-ir';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    },
    july6: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 6, 6);
        var expected = 'http://www.centcom.mil/en/news/articles/july-6-military-airstrikes-continue-against-isil-terrorists-in-syria-and-ir';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    },
    aug3: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 7, 3);
        var expected = 'http://www.centcom.mil/en/news/articles/august-3-military-airstrikes-continue-against-isil-terrorists-in-syria-and';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    },
    sept1: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 8, 1);
        var expected = 'http://www.centcom.mil/en/news/articles/sept.-1-military-airstrikes-continue-against-isil-terrorists-in-syria-and-i';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    },
    nov18: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 10, 18);
        var expected = 'http://www.centcom.mil/en/news/articles/nov.-18-military-airstrikes-continue-against-isil-terrorists-in-syria-and-i';

        var actual = centcomScraper.getURL(date);
        test.equal(expected, actual);
        test.done();
    }
};

exports.parseDate = {
    base: function(test) {
        var lines = [
            'November 02, 2015',
            'Release # 20151102-01',
            'FOR IMMEDIATE RELEASE'
        ];
        var expected = 'November 02, 2015';

        var actual = centcomScraper.parseDate(lines);
        test.equal(expected, actual);
        test.done();
    }
};

exports.parseReleaseNumber = {
    base: function(test) {
        var lines = [
            'November 02, 2015',
            'Release # 20151102-01',
            'FOR IMMEDIATE RELEASE'
        ];
        var expected = '20151102-01';

        var actual = centcomScraper.parseReleaseNumber(lines);
        test.equal(expected, actual);
        test.done();
    }
};

exports.isCountryHeader = {
    base: function(test) {
        var line = 'Syria';
        var expected = true;

        var actual = centcomScraper.isCountryHeader(line);
        test.equal(expected, actual);
        test.done();
    },
    notShare: function(test) {
        var line = 'Share';
        var expected = false;

        var actual = centcomScraper.isCountryHeader(line);
        test.equal(expected, actual);
        test.done();
    },
    notDate: function(test) {
        var line = 'November 02, 2015';
        var expected = false;

        var actual = centcomScraper.isCountryHeader(line);
        test.equal(expected, actual);
        test.done();
    }
};

exports.isStrikeDescription = {
    base: function(test) {
        var line = ' Near Ar Raqqah, an airstrike struck an ISIL military garrison.';
        var expected = true;

        var actual = centcomScraper.isStrikeDescription(line);
        test.equal(expected, actual);
        test.done();
    },
    asterisk: function(test) {
        var line = '*  Near Al Hawl, one strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).';
        var expected = true;

        var actual = centcomScraper.isStrikeDescription(line);
        test.equal(expected, actual);
        test.done();
    },
    hyphens: function(test) {
        var line = '-- Near Al Hasakah, five airstrikes struck four ISIL tactical units, destroying an ISIL tank, six ISIL vehicles, an ISIL building, an ISIL staging position and an ISIL fighting position.';
        var expected = true;

        var actual = centcomScraper.isStrikeDescription(line);
        test.equal(expected, actual);
        test.done();
    },
    not: function(test) {
        var line = 'Syria';
        var expected = false;

        var actual = centcomScraper.isStrikeDescription(line);
        test.equal(expected, actual);
        test.done();
    }
};

exports.isStrikeDescription = {
    base: function(test) {
        var line = '*  Near Al Hawl, one strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).';
        var expected = {
            location: 'Al Hawl',
            number: 'one',
            description: 'destroyed an ISIL vehicle borne improvised explosive device (VBIED).'
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    plural: function(test) {
        var line = '*  Near Al Hawl, two strikes destroyed an ISIL vehicle borne improvised explosive device (VBIED).';
        var expected = {
            location: 'Al Hawl',
            number: 'two',
            description: 'destroyed an ISIL vehicle borne improvised explosive device (VBIED).'
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    space: function(test) {
        var line = '*  Near Al Hasakah, two strikes struck two separate ISIL tactical units and destroyed five ISIL fighting positions, an ISIL rocket, two ISIL vehicles, and wounded an ISIL fighter.';
        var expected = {
            location: 'Al Hasakah',
            number: 'two',
            description: 'struck two separate ISIL tactical units and destroyed five ISIL fighting positions, an ISIL rocket, two ISIL vehicles, and wounded an ISIL fighter.'
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    apostrophe: function(test) {
        var line = '*  Near Mar\'a, six strikes struck five separate ISIL tactical units and destroyed three ISIL fighting positions, an ISIL ammo cache, an ISIL staging area, and three ISIL buildings.';
        var expected = {
            location: 'Mar\'a',
            number: 'six',
            description: 'struck five separate ISIL tactical units and destroyed three ISIL fighting positions, an ISIL ammo cache, an ISIL staging area, and three ISIL buildings.'
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    hyphens: function(test) {
        var line = '--  Near Al Hawl, one strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).';
        var expected = {
            location: 'Al Hawl',
            number: 'one',
            description: 'destroyed an ISIL vehicle borne improvised explosive device (VBIED).'
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
};
