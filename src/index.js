var _ = require('underscore');
var fs = require('fs');
var moment = require('moment');
var scrapeCache = require('scrape-cache');

module.exports = function() {
    var scrapeRelease = function(url, callback, opts) {
        fetchReleaseLines(url, function(result) {
            var parsed = parseReleaseLines(result, url, opts);
            callback(parsed);
        });
    };

    var fetchReleaseLines = function(url, callback) {
        var scraper = function($) {
            // Convert p and br tags into newlines
            // http://stackoverflow.com/questions/3381331/jquery-convert-br-and-br-and-p-and-such-to-new-line
            $.fn.br2nl = function() {
                return this.each(function(i) {
                    var $this = $(this);

                    // Strip existing newlines
                    $this.html($this.html().replace(/[\r|\n]/mg, ' '));

                    // Convert tags to newlines
                    $this.html($this.html().replace(/(<br>)|(<br \/>)|(<p>)|(<\/p>)|(<ul>)|(<\/ul>)|(<li>)|(<\/li>)/g, '\n'));
                });
            };

            var lines = $('#interior table.contentpaneopen').eq(1)
                    .br2nl().text().split('\n');

            // Trim, filter out empty lines
            return result = lines.map(function(d) {
                return d.trim();
            }).filter(function(d) {
                return d !== '';
            });
        };

        scrapeCache.scrape(url, scraper, callback);
    };

    var fetchRelease = function(url, callback) {
        fetchReleaseLines(url, function(result) {
            callback(result.join('\n') + '\n');
        });
    };

    var parseReleaseLines = function(lines, url, opts) {
        var strikes = [];

        var date = parseDate(lines);
        if (!date) {
            date = getDateFromURL(url);
        }
        var releaseNumber = parseReleaseNumber(lines);

        var strikeDescriptions = parseStrikeDescriptions(lines);
        _.each(strikeDescriptions, function(strikesInCountry, country) {
            strikesInCountry.forEach(function(d) {
                var partialStrike = {
                    date: date,
                    releaseNumber: releaseNumber,
                    country: country,
                    url: url
                };
                var strike;
                if (opts) {
                    strike = _.extend(partialStrike, opts);
                }
                strike = _.extend(partialStrike, d);
                strikes.push(strike);
            });
        });

        return strikes;
    };

    // NOTE: This supports a very limited set of dates. See test/test-base.js
    var getDateFromURL = function(url) {
        var monthLookup = {
            'oct.': 10,
            'nov.': 11,
            'sept.': 9,
            'july': 7,
            'march': 3
        };
        var splitSlash = url.split('/');
        var end = splitSlash[splitSlash.length - 1];
        var splitHyphen = end.split('-');
        var month = splitHyphen[0];
        if (month.length === 1) {
            month = '0' + month;
        }
        var day = splitHyphen[1];
        if (day.length === 1) {
            day = '0' + day;
        }
        var year = 2015;
        var dateString = year + ' ' + monthLookup[month] + ' ' + day;
        var date = moment(dateString, 'YYYY MM DD');
        return date.format('MMMM D, YYYY');
    };

    var parseDate = function(lines) {
        var i;
        for (i = 0; i < lines.length; i++) {
            var match = lines[i].match(/(\w+ [0-9]{1,2}, [0-9]{4})/);
            if (match) {
                return match[1];
            }
        }
    };

    var parseReleaseNumber = function(lines) {
        var i;
        for (i = 0; i < lines.length; i++) {
            var match = lines[i].match(/Release # ([0-9\-]+)/);
            if (match) {
                return match[1];
            }
        }
    };

    var isCountryHeader = function(line) {
        // TODO This will fail for other countries
        var match = line.match(/^[\s]*(Syria|Iraq)[\s]*$/);
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
        var match = line.match(/^[\-\*\s•\o]*?Near ([A-Za-z ']+?)\*?,? ([0-9]+|an|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen?) (.+)/);

        if (match) {
            return {
                location: (match && match.length > 1) ? match[1] : false,
                number: (match && match.length > 2) ? getNumber(match[2]) : false,
                description: (match && match.length > 3) ? match[3] : false
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
        scrapeRelease: scrapeRelease,
        fetchRelease: fetchRelease,
        fetchReleaseLines: fetchReleaseLines,
        parseReleaseLines: parseReleaseLines,
        getDateFromURL: getDateFromURL,
        parseDate: parseDate,
        parseReleaseNumber: parseReleaseNumber,
        isCountryHeader: isCountryHeader,
        parseStrikeDescriptions: parseStrikeDescriptions,
        parseSingleStrikeDescriptions: parseSingleStrikeDescriptions,
        getNumber: getNumber
    };
}();
