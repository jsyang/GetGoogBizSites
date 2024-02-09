# Google Business Profile site harvester

Idea from this [r/Entrepreneur thread](https://www.reddit.com/r/Entrepreneur/comments/1alt3ga/are_you_a_webdesigner_this_is_you_chance_to_get/). 
Thanks to the OP for an interesting idea!

<img src="Screen Shot 2024-02-09 at 1.15.34 PM.png"><br><br>

## How to use

- Sign up for a [SerpApi](https://serpapi.com/) account, free tier gives you 100 searches per month, enough for about ~20 city searches. 
    - ⚠️ Going over your quota means your searches will fail to load results!

- In your SerpApi dashboard, copy the API key, then paste it into the `settings.mjs` file into the `API_KEY` field:

> ex: if your API key is `d34db33fd34db33fd34db33f` then your settings.mjs file should look like this:

```js
export default {
    API_KEY: 'd34db33fd34db33fd34db33f',
    PAGE_RESULTS_COUNT: 100,
};
```

- Clone this repo and install NodeJS dependencies 

```bash
# Install dependencies
yarn
```

- Run the script and put in any location specific parameters for your search. The more unique and specific the better. You can use niche keywords as well as location keywords as arguments

> ex: if you're searching for Google Business Profile sites for Leeds, UK run the script like this:

```bash
yarn start Leeds UK
```

> ex: Find Google Business Profile sites for cafes in York, UK run the script like this:

```bash
yarn start cafe York UK
```

## Why don't I get more than about 300 results?

**Short answer**: Google limits the number of total results shown to visitors. See for yourself by performing the same search manually...

**Long answer**: https://serpapi.com/blog/googles-millions-of-search-results-are-not-being-served-in-the-later-pages-search-results/

## License

Public domain, baby!