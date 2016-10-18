var fs = require('fs');

var centcomScraper = require('../src/index.js');

exports.isCountryHeader = {
    base: function(test) {
        var line = 'Syria';
        var expected = true;

        var actual = centcomScraper.isCountryHeader(line);
        test.equal(expected, actual);
        test.done();
    },
    spaces: function(test) {
        var line = '    Syria';
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
    },
    notTypo: function(test) {
        var line = 'strikes struck four separate ISIL tactical units and destroyed six ISIL fighting positions, seven ISIL vehicles, two ISIL tactical vehicles, and an ISIL house borne improvised explosive device (HBIED).         Iraq';
        var expected = false;

        var actual = centcomScraper.isCountryHeader(line);
        test.equal(expected, actual);
        test.done();
    },
    cityCountry: function(test) {
        var line = 'Tikrit, Iraq';
        var expected = true;

        var actual = centcomScraper.isCountryHeader(line);
        test.equal(expected, actual);
        test.done();
    }
};

exports.parseSingletrikeDescriptions = {
    base: function(test) {
        var line = '*  Near Al Hawl, one strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).';
        var expected = {
            location: 'Al Hawl',
            number: 1,
            description: 'strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    plural: function(test) {
        var line = '*  Near Al Hawl, two strikes destroyed an ISIL vehicle borne improvised explosive device (VBIED).';
        var expected = {
            location: 'Al Hawl',
            number: 2,
            description: 'strikes destroyed an ISIL vehicle borne improvised explosive device (VBIED).',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    space: function(test) {
        var line = '*  Near Al Hasakah, two strikes struck two separate ISIL tactical units and destroyed five ISIL fighting positions, an ISIL rocket, two ISIL vehicles, and wounded an ISIL fighter.';
        var expected = {
            location: 'Al Hasakah',
            number: 2,
            description: 'strikes struck two separate ISIL tactical units and destroyed five ISIL fighting positions, an ISIL rocket, two ISIL vehicles, and wounded an ISIL fighter.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    apostrophe: function(test) {
        var line = '*  Near Mar\'a, six strikes struck five separate ISIL tactical units and destroyed three ISIL fighting positions, an ISIL ammo cache, an ISIL staging area, and three ISIL buildings.';
        var expected = {
            location: 'Mar\'a',
            number: 6,
            description: 'strikes struck five separate ISIL tactical units and destroyed three ISIL fighting positions, an ISIL ammo cache, an ISIL staging area, and three ISIL buildings.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    hyphens: function(test) {
        var line = '--  Near Al Hawl, one strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).';
        var expected = {
            location: 'Al Hawl',
            number: 1,
            description: 'strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    airstrike: function(test) {
        var line = '* Near Kobani, five airstrikes destroyed eight ISIL fighting positions.';
        var expected = {
            location: 'Kobani',
            number: 5,
            description: 'airstrikes destroyed eight ISIL fighting positions.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    jan9Kobani: function(test) {
        var line = '*  Near Kobani, five airstrikes struck an ISIL fighting position and two ISIL tactical units and destroyed an ISIL building and seven ISIL fighting positions.';
        var expected = {
            location: 'Kobani',
            number: 5,
            description: 'airstrikes struck an ISIL fighting position and two ISIL tactical units and destroyed an ISIL building and seven ISIL fighting positions.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    feb6Fallujah: function(test) {
        var line = '* Near Fallujah an airstrike, struck an ISIL tactical unit.';
        var expected = {
            location: 'Fallujah',
            number: 1,
            description: 'airstrike, struck an ISIL tactical unit.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    july1Sinjar: function(test) {
        var line = '-- Near Sinjar three airstrikes struck an ISIL tactical unit and an ISIL sniper position, destroying an ISIL fighting position, an ISIL heavy machine gun and an ISIL building.';
        var expected = {
            location: 'Sinjar',
            number: 3,
            description: 'airstrikes struck an ISIL tactical unit and an ISIL sniper position, destroying an ISIL fighting position, an ISIL heavy machine gun and an ISIL building.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    jan17Dawr: function(test) {
        var line = '* Near Dawr az Zawr, an airstrike struck an ISIL tactical unit.';
        var expected = {
            location: 'Dawr az Zawr',
            number: 1,
            description: 'airstrike struck an ISIL tactical unit.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    jan19Kobani: function(test) {
        var line = '* Near Kobani, 11 airstrikes struck two large ISIL units and eight ISIL tactical units and destroyed three ISIL fighting positions, two ISIL staging positions, and an ISIL vehicle.';
        var expected = {
            location: 'Kobani',
            number: 11,
            description: 'airstrikes struck two large ISIL units and eight ISIL tactical units and destroyed three ISIL fighting positions, two ISIL staging positions, and an ISIL vehicle.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    jan23AlAsad: function(test) {
        var line = '* Near Al Asad*, three airstrikes struck two ISIL tactical units, a large ISIL unit, and an ISIL vehicle, and destroyed an ISIL IED and two ISIL vehicles.';
        var expected = {
            location: 'Al Asad',
            number: 3,
            description: 'airstrikes struck two ISIL tactical units, a large ISIL unit, and an ISIL vehicle, and destroyed an ISIL IED and two ISIL vehicles.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    may13AlHasakah: function(test) {
        var line = 'Near Al Hasakah, three airstrikes struck two ISIL tactical units and an ISIL trench system, destroying six ISIL fighting positions, two ISIL vehicles and an ISIL tank.';
        var expected = {
            location: 'Al Hasakah',
            number: 3,
            description: 'airstrikes struck two ISIL tactical units and an ISIL trench system, destroying six ISIL fighting positions, two ISIL vehicles and an ISIL tank.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    sept15AlHasakah: function(test) {
        var line = '• Near Al Hasakah, two airstrikes struck an ISIL tactical unit and destroyed an ISIL armored personnel carrier.';
        var expected = {
            location: 'Al Hasakah',
            number: 2,
            description: 'airstrikes struck an ISIL tactical unit and destroyed an ISIL armored personnel carrier.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    april9AlHasakah: function(test) {
        var line = 'o Near Al Hasakah, four airstrikes struck an ISIL tactical unit, two ISIL vehicles and destroyed five ISIL vehicles and an ISIL tank.';
        var expected = {
            location: 'Al Hasakah',
            number: 4,
            description: 'airstrikes struck an ISIL tactical unit, two ISIL vehicles and destroyed five ISIL vehicles and an ISIL tank.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    },
    march26Tikrit: function(test) {
        var line = '- In Tikrit, 17 airstrikes struck an ISIL building, two ISIL bridges, three ISIL checkpoints, two ISIL staging areas, two ISIL berms, an ISIL roadblock and an ISIL controlled command and control facility.';
        var expected = {
            location: 'Tikrit',
            number: 17,
            description: 'airstrikes struck an ISIL building, two ISIL bridges, three ISIL checkpoints, two ISIL staging areas, two ISIL berms, an ISIL roadblock and an ISIL controlled command and control facility.',
            line: line
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    }
};
