# this is not (a) normal todo

Extension to keep track of daily civic todos. Kills Facebook and Twitter if you don't do anything for 24 hours.

https://chrome.google.com/webstore/detail/this-is-not-a-normal-todo/kfgbgpcghenjplklaebdnamgkjglclij

## Usage

This was bootstrapped off of Mozilla's React webextension sample. I didn't end up using React for now, since it was unnecessary for the first draft, but I may use it later. Here's how to build it:

First, you need to change into the example subdirectory and install all
[NodeJS][nodejs] dependencies with [npm](http://npmjs.com/) or
[yarn](https://yarnpkg.com/):

    npm install

Start the continuous build process to transpile the code into something that
can run in Firefox or Chrome:

    npm run build

This creates a WebExtension in the `extension` subdirectory.
Any time you edit a file, it will be rebuilt automatically.
