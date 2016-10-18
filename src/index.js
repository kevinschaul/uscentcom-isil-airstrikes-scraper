var _ = require('underscore');
var fs = require('fs');
var moment = require('moment');
var scrapeCache = require('scrape-cache');

module.exports = function() {
    /*
     * Parse the raw contents of a press release object
     * @param {Object[]} results - An array of results, one per press release
     * @param {string} results[].date - The date for the release
     * @param {string} results[].title - The date for the release
     * @param {string[]} results[].contents - An array of lines for the release's
     *        main contents
     */
    var parseReleaseLines = function(results) {
        var strikes = [];

        _.each(results, function(result) {
            var strikeDescriptions = parseStrikeDescriptions(result.contents);
            _.each(strikeDescriptions, function(strikesInCountry, country) {
                strikesInCountry.forEach(function(d) {
                    var partialStrike = {
                        date: result.date,
                        title: result.title,
                        country: country
                    };
                    var strike = _.extend(partialStrike, d);
                    strikes.push(strike);
                });
            });
        });

        return strikes;
    };

    var parseDate = function(lines) {
        var i;
        for (i = 0; i < lines.length; i++) {
            var match = lines[i].match(/([\w\.]+ [0-9]{1,2}, [0-9]{4})/);
            if (match) {
                return match[1];
            }
        }
    };

    var parseReleaseNumber = function(lines) {
        var i;
        for (i = 0; i < lines.length; i++) {
            var match = lines[i].match(/Release No: ([0-9\-]+)/);
            if (match) {
                return match[1];
            }
        }
    };

    var isCountryHeader = function(line) {
        var match = line.match(/^[\w,]*[\s]*(Syria|Iraq)[\s]*$/);
        return !!match;
    };

    var parseStrikeDescriptions = function(lines) {
        var currentCountry = 'Unknown';
        var strikeDescriptions = {};
        strikeDescriptions[currentCountry] = [];

        var i;
        for (i = 0; i < lines.length; i++) {
            if (isCountryHeader(lines[i])) {
                currentCountry = lines[i].trim();
                strikeDescriptions[currentCountry] = strikeDescriptions[currentCountry] || [];
            } else {
                var strikeDescription = parseSingleStrikeDescriptions(lines[i]);
                if (strikeDescription) {
                    strikeDescriptions[currentCountry].push(strikeDescription);
                }
            }
        }

        return strikeDescriptions;
    };

    var parseSingleStrikeDescriptions = function(line) {
        var match = line.match(/^[\-\*\s•\o]*?(?:Near|In) ([A-Za-z '’]+?)\*?,? ([0-9]+|an|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen?) (.+)/);

        if (match) {
            return {
                location: (match && match.length > 1) ? match[1] : false,
                number: (match && match.length > 2) ? getNumber(match[2]) : false,
                description: (match && match.length > 3) ? match[3] : false,
                line: line
            };
        }
    };

    var getNumber = function(string) {
        var lookup = {
            'an': 1,
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6,
            'seven': 7,
            'eight': 8,
            'nine': 9,
            'ten': 10,
            'eleven': 11,
            'twelve': 12,
            'thirteen': 13,
            'fourteen': 14,
            'fifteen': 15
        };
        return lookup[string] || string;
    };

    return {
        parseReleaseLines: parseReleaseLines,
        parseDate: parseDate,
        parseReleaseNumber: parseReleaseNumber,
        isCountryHeader: isCountryHeader,
        parseStrikeDescriptions: parseStrikeDescriptions,
        parseSingleStrikeDescriptions: parseSingleStrikeDescriptions,
        getNumber: getNumber
    };
}();
