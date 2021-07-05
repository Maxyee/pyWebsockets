# Repository-Box Desktop App

## Features

- User can add repository link
- User can delete all repository link
- User can delete single respository from the list/box
- User can close the app

## Screenshot of project

- image link

## Work Step by Step

1. ***

- At first, we need to make a package.json file . use this command `npm init`
- Install necessary packages for the work

```bash
npm install --save electron

```

- replace this script line code from `package.json` file. for running the project

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

- Make a gitignore file by taking help from (gitignore.io)
- Create a file called `main.js` and put below code

```js
const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});
});
```

- Now load a html file to the mainWindow
- Make a directory called `static` and make a file `mainWindow.html` into that directory

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Repository Box</title>
  </head>
  <body>
    <h1>Repository Box</h1>
  </body>
</html>
```

- Now we need to implement this `mainWindow.html` file to the `main.js` file

```js
const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});

  // Load the mainWindow.html file
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./static/mainWindow.html"),
      protocol: "file",
      slashes: true,
    })
  );
});
```

- try to run the `npm start` command we will get main window open

2. ***

- Lets make a custom menu bar
- at first we need to separate our services to another folder and then `exports` those into the `main.js` file
- make folder called `templates` into that folder lets make a file `MainMenu.js` and put the code below

```js
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Repository",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Clear Repository",
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

module.exports = { mainMenuTemplate };
```

- finally add this module to the `main.js file`

```js
const { mainMenuTemplate } = require("./templates/MainMenu");
```

3. ***

- Lets create a `createAddWindow` function task
