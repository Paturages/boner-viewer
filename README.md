# boner-viewer

Don't question my naming sense, this is a WIP Trombone Champ chart previewer

## Features

* Loads and previews `.tmb` JSON files
* Loads and previews base game `.tmb` chart files (NRBF)
* "Trombone" playback, ability to provide music playback (supports `.ogg`, and likely many other things,
  to the extent of browser support pretty much)
* `savednotespacing` and tempo fidelity in regards to the game, (un)zooming ability
* Playback rates from 25% to 200%
* Audio waveform preview for sync checks

## TODO

* Lyrics editing
* .tmb re-export
* Metronome
* Change grid snap
* Importing assets from remote URLs and handling hotlinks
* Possibly handle MIDI parsing (there are other tools for that)
* Tempo editing (multi-tempo support/"polyfill"?)
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

## Ideas

* Use [Rubber Band library](https://breakfastquay.com/rubberband/why.html) [[rubberband-web (wasm)](https://github.com/delude88/rubberband-web)]
  for better quality playback rate (they have a fast algorithm)
* Import/export lyrics from Clone Hero charts (lol)