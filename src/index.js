var _ = require('underscore');
var scraperjs = require('scraperjs');

module.exports = function() {
    var scrapeRelease = function(url, callback) {
        fetchReleaseLines(url, function(result) {
            var parsed = parseReleaseLines(result);
            callback(parsed);
        });
    };

    var fetchReleaseLines = function(url, callback) {
        scraperjs.StaticScraper
            .create(url)
            .scrape(function($) {
                // Convert p and br tags into newlines
                // http://stackoverflow.com/questions/3381331/jquery-convert-br-and-br-and-p-and-such-to-new-line
                $.fn.nl2br = function() {
                    return this.each(function(i) {
                        var $this = $(this);
                        $this.html($this.html().replace(/(<br>)|(<br \/>)|(<p>)|(<\/p>)/g, '\n'));
                    });
                };

                var lines = $('#interior table.contentpaneopen').eq(1).nl2br()
                        .text().split('\n');

                // Trim, filter out empty lines
                return lines.map(function(d) {
                    return d.trim();
                }).filter(function(d) {
                    return d !== '';
                });

            }).then(function(result) {
                return callback(result);
            });
    };

    var fetchRelease = function(url, callback) {
        fetchReleaseLines(url, function(result) {
            callback(result.join('\n') + '\n');
        });
    };

    var parseReleaseLines = function(lines) {
        var strikes = [];

        var date = parseDate(lines);
        var releaseNumber = parseReleaseNumber(lines);

        var strikeDescriptions = parseStrikeDescriptions(lines);
        _.each(strikeDescriptions, function(strikesInCountry, country) {
            strikesInCountry.forEach(function(d) {
                var partialStrike = {
                    date: date,
                    releaseNumber: releaseNumber,
                    country: country
                };
                var strike = _.extend(partialStrike, d);
                strikes.push(strike);
            });
        });

        return strikes;
    };

    var parseDate = function(lines) {
        var i;
        for (i = 0; i < lines.length; i++) {
            var match = lines[i].match(/(\w+ [0-9]{2}, [0-9]{4})/);
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
        return line === 'Syria' || line === 'Iraq';
    };

    var parseStrikeDescriptions = function(lines) {
        var currentCountry = 'Unknown';
        var strikeDescriptions = {};
        strikeDescriptions[currentCountry] = [];

        var i;
        for (i = 0; i < lines.length; i++) {
            if (isCountryHeader(lines[i])) {
                currentCountry = lines[i];
                strikeDescriptions[currentCountry] = [];
            } else if (isStrikeDescription(lines[i])) {
                strikeDescriptions[currentCountry].push(
                        parseSingleStrikeDescriptions(lines[i]));
            }
        }

        return strikeDescriptions;
    };

    var isStrikeDescription = function(line) {
        return !!line.match(/^\*[\s]+?Near /);
    };

    var parseSingleStrikeDescriptions = function(line) {
        var match = line.match(/^\*[\s]+?Near ([A-Za-z ']+?), ([a-z]+?) strike[s]? (.*)/);

        return {
            location: (match && match.length > 1) ? match[1] : false,
            number: (match && match.length > 2) ? match[2] : false,
            description: (match && match.length > 3) ? match[3] : false
        };
    };

    return {
        scrapeRelease: scrapeRelease,
        fetchRelease: fetchRelease,
        fetchReleaseLines: fetchReleaseLines,
        parseReleaseLines: parseReleaseLines,
        parseDate: parseDate,
        parseReleaseNumber: parseReleaseNumber,
        isCountryHeader: isCountryHeader,
        parseStrikeDescriptions: parseStrikeDescriptions,
        isStrikeDescription: isStrikeDescription,
        parseSingleStrikeDescriptions: parseSingleStrikeDescriptions
    };
}();
