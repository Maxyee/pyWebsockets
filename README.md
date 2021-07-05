# Repository-Box Desktop App

## Features

- User can add repository name and Link
- User can delete all repository link
- user can delete single respository from the list/box
- User can close the app

## Screenshot of project

- image link

## Work Step by Step

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
- Make a directory called `templates` and make a file `mainWindow.html` into that directory

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
      pathname: path.join(__dirname, "./templates/mainWindow.html"),
      protocol: "file",
      slashes: true,
    })
  );
});
```

- try to run the `npm start` command we will get main window open
