# USCENTCOM ISIL airstrikes scraper

A scraper for [press releases about Operation Inherent Resolve](http://www.centcom.mil/en/news/).

    node examples/scrape-url.js http://www.centcom.mil/en/news/articles/nov.-17-military-airstrikes-continue-against-isil-terrorists-in-syria-and-i

## Dates supported by scraper

This scraper handles press releases since [Dec. 19](http://www.centcom.mil/en/news/articles/dec.-19-military-airstrikes-continue-against-isil-in-syria-and-iraq).
Before this date, air strike press releases followed very different
formats.

The earliest related press release was on: [August 8](http://www.centcom.mil/en/news/press-releases/u.s.-aircraft-conduct-targeted-airstrike-in-northern-iraq)

## Corrections

Some press releases may include corrections (e.g. [nov 18](http://www.centcom.mil/en/news/articles/nov.-18-military-airstrikes-continue-against-isil-terrorists-in-syria-and-i)):

    The strike release published on Nov. 16 includes a French strike listed as "Near Ar Raqqah, one strike struck an ISIL storage depot." After further coordination with the French Ministry of Defense, we have determined that France conducted two separate strikes on two different targets. The first target was an ISIL storage depot and the second strike against an ISIL command and control node.

**The scraper does not currently make these corrections.**

## Structure changes over time

* Description lines change format a lot. A sampling:

    Feb. 19:
    * Near Al Hasakah, two airstrikes struck multiple ISIL oil pump jacks and destroyed an ISIL checkpoint.

    March 26:
    <li> Near Ar Raqqah, an airstrike struck an ISIL military garrison.</li>

    July 6:
    -- Near Al Hasakah, five airstrikes struck four ISIL tactical units, destroying an ISIL tank, six ISIL vehicles, an ISIL building, an ISIL staging position and an ISIL fighting position.

