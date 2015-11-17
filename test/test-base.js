var fs = require('fs');

var centcomScraper = require('../src/index.js');

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
        var line = '*  Near Al Hawl, one strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).';
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
    }
};
