# Altar Quest Companion

This is a companion app for the board game [Altar Quest](https://boardgamegeek.com/boardgame/273703/altar-quest) from [Blacklist Games](https://www.blacklistgamesllc.com/). It was created to assist players with the management of the game as they play.

## Features

 - **Progressive Web Application** - Can be installed as an app directly from the web browser on your desktop, laptop, mobile or tablet device. Updates will automatically be pushed to your device.
 - **Token Tracker** - Keep track of your tokens for Actions, Damage, Armor, Focus, Threat, Supply, Inspiration, Snare and Melody.
 - **Game Generator** - Randomly generate a game based on the base game or expansions that you own.
 - **Dice Roller** - Roll your dice digitally, useful if you only have a single set of physical dice.

## Building the Application

This application is just a standard HTML/JavaScript/CSS application. It uses [Workbox](https://developers.google.com/web/tools/workbox) to build the Progressive Web Application manifest file. If you make changes to the code, you should just run `workbox injectManifest` in the root directory, to ensure that the cache has been updated.

You can run the application under any basic web server. I personally just use the [http-server] (https://www.npmjs.com/package/http-server) NodeJS package.