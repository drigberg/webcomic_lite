/**
 * Module dependencies
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

/**
 * Module variables
 */

const app = express();
const port = process.env.PORT || 5000;
const assetsPath = path.join(__dirname, '/public/assets/comics');
const metadataPath = path.join(assetsPath, '/metadata.json');

/**
 * Middleware
 */

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'pug');

/**
 * Routes
 */

function getMetadata() {
    const metadataString = fs.readFileSync(metadataPath);
    const data = JSON.parse(metadataString);
    return data;
}

app.get('/', function (req, res) {
    const metadata = getMetadata();
    const sorted = metadata.comics.sort(
        (obj1, obj2) => new Date(obj1.date) - new Date(obj2.date));
    const latest = sorted[sorted.length - 1];
    let comicData = latest;
    let index = sorted.length - 1;
    if (req.query.index !== undefined) {
        const requestedIndex = parseInt(req.query.index);
        if (requestedIndex >= 0 && requestedIndex < sorted.length) {
            comicData = sorted[requestedIndex];
            index = requestedIndex;
        }
    }
    const previousIndex = index > 0 ? index - 1 : null;
    const nextIndex = index < sorted.length - 1 ? index + 1 : null;
    res.render('index', {
        'data': {
            'comicData': comicData,
            'nextIndex': nextIndex,
            'previousIndex': previousIndex,
        }
    });
});

app.get('/archive', function (req, res) {
    res.render('archive', {});
});

app.get('*', function (req, res) {
    res.redirect('/');
});

/**
 * Server start
 */

app.listen(port, function (err) {
    if (err) {
        console.log('ERROR', err);
    } else {
        console.log('Personal site server is running on port', port);
    }
});
