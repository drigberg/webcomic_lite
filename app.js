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

const metadata = JSON.parse(fs.readFileSync(metadataPath));
const sortedComics = metadata.comics.sort(
    (obj1, obj2) => new Date(obj1.date) - new Date(obj2.date));

/**
 * Middleware
 */

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'pug');

/**
 * Routes
 */
app.get('/', function (req, res) {
    res.redirect(`/${sortedComics.length - 1}`);
});

app.get('/:comic/', function (req, res) {
    const latest = sortedComics[sortedComics.length - 1];
    let comicData = latest;
    let index = sortedComics.length - 1;
    const requestedIndex = parseInt(req.params.comic);
    if (requestedIndex >= 0 && requestedIndex < sortedComics.length) {
        comicData = sortedComics[requestedIndex];
        index = requestedIndex;
    }
    const previousIndex = index > 0 ? index - 1 : 0;
    const nextIndex = index < sortedComics.length - 1 ? index + 1 : sortedComics.length - 1;
    res.render('index', {
        data: {
            siteTitle: metadata.siteTitle,
            comicData: comicData,
            currentIndex: index,
            nextIndex: nextIndex,
            previousIndex: previousIndex,
            lastIndex: sortedComics.length - 1
        }
    });
});

app.get('/archive', function (req, res) {
    res.render('archive', {
        data: {
            siteTitle: metadata.siteTitle,
            sortedComics: sortedComics
        }
    });
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
        console.log('Webcomic server is running on port', port);
    }
});
