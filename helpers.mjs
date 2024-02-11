import crypto from 'crypto';
import fs from 'fs';

export function getMD5(value) {
    return crypto.createHash('md5').update(value.toString()).digest("hex").slice(0, 5);
}

export function logListings(name, json) {
    fs.writeFileSync(name + '.json', JSON.stringify(json));
}