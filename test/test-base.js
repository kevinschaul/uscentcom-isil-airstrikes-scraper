var fs = require('fs');

var centcomScraper = require('../src/index.js');

exports.URLFromDate = {
    jan16: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 0, 16);
        var expected = 'http://www.centcom.mil/en/news/articles/jan.-16-military-airstrikes-continue-against-isil-in-syria-and-iraq';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    feb19: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 1, 19);
        var expected = 'http://www.centcom.mil/en/news/articles/feb.-19-military-airstrikes-continue-against-isil-in-syria-and-iraq';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    march26: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 2, 26);
        var expected = 'http://www.centcom.mil/en/news/articles/march-26-military-airstrikes-continue-against-isil-in-syria-and-iraq';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    april28: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 3, 28);
        var expected = 'http://www.centcom.mil/en/news/articles/april-28-military-airstrikes-continue-against-isil-in-syria-and-iraq';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    may9: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 4, 9);
        var expected = 'http://www.centcom.mil/en/news/articles/may-9-military-airstrikes-continue-against-isil-in-syria-and-iraq';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    may13: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 4, 13);
        var expected = 'http://www.centcom.mil/en/news/articles/may-13-military-airstrikes-continue-against-isil-terrorists-in-syria-and-ir';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    may29: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 4, 29);
        var expected = 'http://www.centcom.mil/en/news/articles/may-29-military-airstrikes-continue-against-isil-terrorists-in-syria-and-ir';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    july6: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 6, 6);
        var expected = 'http://www.centcom.mil/en/news/articles/july-6-military-airstrikes-continue-against-isil-terrorists-in-syria-and-ir';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    aug3: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 7, 3);
        var expected = 'http://www.centcom.mil/en/news/articles/august-3-military-airstrikes-continue-against-isil-terrorists-in-syria-and';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    aug11: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 7, 11);
        var expected = 'http://www.centcom.mil/en/news/articles/aug.-11-military-airstrikes-continue-against-isil-terrorists-in-syria-and-i';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    sept1: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 8, 1);
        var expected = 'http://www.centcom.mil/en/news/articles/sept.-1-military-airstrikes-continue-against-isil-terrorists-in-syria-and-i';

        var actual = centcomScraper.URLFromDate(date);
        test.equal(expected, actual);
        test.done();
    },
    nov18: function(test) {
        // year is 0-indexed
        var date = new Date(2015, 10, 18);
        var expected = 'http://www.centcom.mil/en/news/articles/nov.-18-military-airstrikes-continue-against-isil-terrorists-in-syria-and-i';

        var actual = centcomScraper.URLFromDate(date);
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
    },
    feb6: function(test) {
        var lines = [
            'February 6, 2015',
            'Release # 20151102-01',
            'FOR IMMEDIATE RELEASE'
        ];
        var expected = 'February 6, 2015';

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
    },
    march4: function(test) {
        var lines = [
            'Release # 20150304',
            'FOR IMMEDIATE RELEASE'
        ];
        var expected = '20150304';

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

exports.parseSingletrikeDescriptions = {
    base: function(test) {
        var line = '*  Near Al Hawl, one strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).';
        var expected = {
            location: 'Al Hawl',
            number: 1,
            description: 'strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).'
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
            description: 'strikes destroyed an ISIL vehicle borne improvised explosive device (VBIED).'
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
            description: 'strikes struck two separate ISIL tactical units and destroyed five ISIL fighting positions, an ISIL rocket, two ISIL vehicles, and wounded an ISIL fighter.'
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
            description: 'strikes struck five separate ISIL tactical units and destroyed three ISIL fighting positions, an ISIL ammo cache, an ISIL staging area, and three ISIL buildings.'
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
            description: 'strike destroyed an ISIL vehicle borne improvised explosive device (VBIED).'
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
            description: 'airstrikes destroyed eight ISIL fighting positions.'
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
            description: 'airstrikes struck an ISIL fighting position and two ISIL tactical units and destroyed an ISIL building and seven ISIL fighting positions.'
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
            description: 'airstrike, struck an ISIL tactical unit.'
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
            description: 'airstrikes struck an ISIL tactical unit and an ISIL sniper position, destroying an ISIL fighting position, an ISIL heavy machine gun and an ISIL building.'
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
            description: 'airstrike struck an ISIL tactical unit.'
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
            description: 'airstrikes struck two large ISIL units and eight ISIL tactical units and destroyed three ISIL fighting positions, two ISIL staging positions, and an ISIL vehicle.'
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
            description: 'airstrikes struck two ISIL tactical units, a large ISIL unit, and an ISIL vehicle, and destroyed an ISIL IED and two ISIL vehicles.'
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
            description: 'airstrikes struck two ISIL tactical units and an ISIL trench system, destroying six ISIL fighting positions, two ISIL vehicles and an ISIL tank.'
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
            description: 'airstrikes struck an ISIL tactical unit and destroyed an ISIL armored personnel carrier.'
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
            description: 'airstrikes struck an ISIL tactical unit, two ISIL vehicles and destroyed five ISIL vehicles and an ISIL tank.'
        };

        var actual = centcomScraper.parseSingleStrikeDescriptions(line);
        test.deepEqual(expected, actual);
        test.done();
    }
};
