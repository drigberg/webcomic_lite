# webcomic_lite
A basic webcomic server for sharing funny stuff, with navigation and an archive.

## SETUP

1) Create a folder called "comics" in the public/assets directory, containing a folder called "images" and a file called "metadata.json".
2) Structure the metadata file as such:
```json
{
    "comics": [
        {
            "title": "Precedence Day",
            "hoverText": "Precedence Day",
            "filename": "precedence_day.png",
            "date": "2020-02-04",
            "dimensions": {
                "width": 480,
                "height": 480
            }
        }
    ]
```
3) For each comic in the metadata file, add an image with that filename to the public/assets/comics/images/ folder.
4) Add an icon at public/assets/icon.png.
5) Run `node validate_assets.js` to verify that all metadata objects point to an existing image.


## USAGE

Run `npm start` to run the server.
Run `npm run start-dev` to run the server in development mode (site will refresh when changes are made).
