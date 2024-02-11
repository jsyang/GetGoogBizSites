const [_NODE, _SCRIPT, ...LOCATIONQUERY] = process.argv;

import { getMD5 } from './helpers.mjs';
import Providers from './providers.mjs';

(async () => {
    const q = `${LOCATIONQUERY.map(l => `"${l}"`).join(' ')} site:.business.site`;
    let md5 = getMD5(Date.now().toString());
    const logFilename = `response.${md5}`;

    await Providers.harvestFrom(Providers.VENDORS.goog, q, logFilename);
    // await Providers.harvestFrom(Providers.VENDORS.duck, q, logFilename);
})();

