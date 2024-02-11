import * as SerpApi from 'serpapi';
import Settings from './settings.mjs';

import { logListings } from './helpers.mjs';

export const VENDORS = {
    goog: 'google',
    duck: 'duckduckgo',
};

async function google(query, logFilename) {
    let response = { search_information: { total_results: 0 } };
    let start = 0;
    let organic_results = [];
    let totalResults = 0;
    let newResults = 0;

    do {
        response = await SerpApi.getJson({
            engine: VENDORS.goog,
            api_key: Settings.API_KEY,
            q: query,
            start,
            num: Settings.PAGE_RESULTS_COUNT,
        });

        if (start === 0) {
            totalResults = response.search_information.total_results;
            console.log(`Found ${totalResults} results for the query ${query} !`);
        }

        newResults = response.organic_results ? response.organic_results.filter(Boolean) : [];

        organic_results = organic_results.concat(newResults);
        start += Settings.PAGE_RESULTS_COUNT;

        console.log(`Total scraped results: ${organic_results.length}...`);

        logListings(logFilename, organic_results);
    } while (start < totalResults && newResults.length > 0);

    console.log('All done: no more results!');
}

async function duck(query, logFilename) {
    let response = { serpapi_pagination: { next: null } };
    let organic_results = [];
    let newResults = 0;
    let start = 0;

    do {
        response = await SerpApi.getJson({
            engine: VENDORS.duck,
            api_key: Settings.API_KEY,
            q: query,
            start,
            num: Settings.PAGE_RESULTS_COUNT,
        });

        newResults = response.organic_results ? response.organic_results.filter(Boolean) : [];

        organic_results = organic_results.concat(newResults);
        start += newResults.length;

        console.log(`Total scraped results: ${organic_results.length}...`);

        logListings(logFilename, organic_results);

        // Quit if no more results
        if (!response.serpapi_pagination) {
            break;
        }
    } while (newResults.length > 0);

    console.log('All done: no more results!');
}

export async function harvestFrom(provider = VENDORS.goog, query, logFilename) {
    switch (provider) {
        case VENDORS.goog:
            return google(query, logFilename);
        case VENDORS.duck:
            return duck(query, logFilename);
        default:
            throw new Error('Invalid vendor specified! See providers.mjs for a list of vendors.');
    }
}

export default {
    harvestFrom,
    VENDORS,
};