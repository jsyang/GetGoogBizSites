import fs from 'fs';
import crypto from 'crypto';

import * as SerpApi from 'serpapi';
import Settings from './settings.mjs';

const getMD5 = value => crypto.createHash('md5').update(value).digest("hex").slice(0, 5);
const [_NODE, _SCRIPT, ...LOCATIONQUERY] = process.argv;

function logListings(name, json) {
    fs.writeFileSync(name + '.json', JSON.stringify(json));
}

(async () => {
    const q = `${LOCATIONQUERY.map(l => `"${l}"`).join(' ')} site:.business.site`;
    let md5 = getMD5(Date.now().toString());
    let response = { search_information: { total_results: 0 } };
    let start = 0;
    let organic_results = [];
    let totalResults = 0;
    let newResults = 0;

    do {
        response = await SerpApi.getJson({
            engine: "google",
            api_key: Settings.API_KEY,
            q,
            start,
            num: Settings.PAGE_RESULTS_COUNT,
        });

        if (start === 0) {
            totalResults = response.search_information.total_results;
            console.log(`Found ${totalResults} results for the query ${q} !`);
        }

        newResults = response.organic_results ? response.organic_results.filter(Boolean) : [];

        organic_results = organic_results.concat(newResults);
        start += Settings.PAGE_RESULTS_COUNT;

        console.log(`Total scraped results: ${organic_results.length}...`);

        logListings(`response.${md5}`, organic_results);
    } while (start < totalResults && newResults.length > 0);

    console.log('All done: no more results!');
})();

