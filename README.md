# USCENTCOM ISIL airstrikes scraper

A scraper for [press releases about Operation Inherent Resolve](http://www.centcom.mil/en/news/).

    node examples/scrape-url.js http://www.centcom.mil/en/news/articles/nov.-17-military-airstrikes-continue-against-isil-terrorists-in-syria-and-i

## Structure changes over time

* **XX date** URL structure changes slightly (adds word "terrorists",
  becomes truncated):
    New: http://www.centcom.mil/en/news/articles/nov.-17-military-airstrikes-continue-against-isil-terrorists-in-syria-and-i

    Old: http://www.centcom.mil/en/news/articles/feb.-28-military-airstrikes-continue-against-isil-in-syria-and-iraq

* **XX date** Airstrike description lines change format (from an HTML ul
  to text asterisks)

