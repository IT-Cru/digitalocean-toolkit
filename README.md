# DigitalOcean ToolKit

[![Build Status](https://travis-ci.org/IT-Cru/digitalocean-toolkit.svg?branch=feature/issue-1-use-ts-dots)](https://travis-ci.org/IT-Cru/digitalocean-toolkit)

DigitalOcean ToolKit is a Browser Extension that allows you to monitor and manage all your droplets. You can:

- Easily see all your droplets and their current status.
- Reboot, Shutdown, Power on/cycle/off.
- View cost per month, and estimated total monthly cost (Based on current number of droplets and their monthly charges).

## Screenshots

![DigitalOcean ToolKit Screenshot](/src/common/icons/toolkit-screenshot-640x400.png)

![DigitalOcean ToolKit Options Screenshot](/src/common/icons/toolkit-options-screenshot-1280x800.png)

## Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

## Option

* [Visual Studio Code](https://code.visualstudio.com/)

## Includes the following

* TypeScript
* Webpack
* Moment.js
* jQuery
* Jest
* Example Code
    * Chrome Storage
    * Options Version 2
    * content script
    * count up badge number
    * background

## Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Import as Visual Studio Code project

...

## Build

```
npm run build
```

## Build in watch mode

### terminal

```
npm run watch
```

### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## Load extension to chrome

Load `dist` directory

## Test
`npx jest` or `npm run test`
