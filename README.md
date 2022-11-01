# boner-viewer

Don't question my naming sense, this is a WIP Trombone Champ chart previewer

## Features

* Loads and previews `.tmb` JSON files
* Loads and previews base game `.tmb` chart files (NRBF)
* "Trombone" playback, ability to provide music playback

## TODO

* Importing assets from remote URLs and handling hotlinks
* Metadata editing, and .tmb re-export
* Possibly handle MIDI parsing (there are other tools for that)
* Change grid snap
* Lyrics editing
* Try to make this somewhat usable on mobile (lol)
* Some other stuff I'll think about eventually

## Why?

I don't know man

## Notes

* This is probably the weirdest way to learn about writing SVGs by hand
* I could probably think about implementing color profiles and increase fidelity in regards to the actual game
  and so on, but there are other better tools out there for that
* I tried to experiment with embedding compressed chart data in the URL for quick hotlinking,
  but it ended up way too big to be serviceable (>2000 characters)