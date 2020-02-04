# webcomic_lite
A basic webcomic server for sharing funny stuff, with navigation and an archive.

## SETUP

1) Create a folder called "comics" in the public/assets directory, containing a folder called "images" and a file called "metadata.json".
2) Structure the metadata file as such:
```json
{
    "siteTitle": "Detective Daikon Radish Comics",
    "comics": [
        {
            "title": "The First Cabbage",
            "hoverText": "MY CABBAGES!",
            "filename": "my_cabbages.png",
            "date": "2037-01-12"
        }
    ]
```
3) For each comic in the metadata file, add an image with that filename to the public/assets/comics/images/ folder.
4) Add an icon at public/assets/icon.png.
5) Run `node validate_assets.js` to verify that all metadata objects point to an existing image.


## USAGE

Run `npm start` to run the server.
Run `npm run start-dev` to run the server in development mode (site will refresh when changes are made).
