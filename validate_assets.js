/**
 * Module dependencies
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

/**
 * Module variables
 */

const assetsPath = path.join(__dirname, '/public/assets/comics');
const metadataPath = path.join(assetsPath, '/metadata.json');

/**
 * Module
 */
const metadataString = fs.readFileSync(metadataPath);
const data = JSON.parse(metadataString);
for (let i = 0; i < data.comics.length; i++) {
    const filepath = path.join(assetsPath, 'images', data.comics[i].filename);
    assert.ok(fs.existsSync(filepath), `Image ${filepath} is missing.`);
}

console.log('All is good!');
