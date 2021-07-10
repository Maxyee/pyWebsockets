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
```

3. ***

- Lets create a `createAddWindow` function task

```js
let addWindow;

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add Repository To The Box",

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // Load Html file to the window
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./static/addWindow.html"),
      protocol: "file",
      slashes: true,
    })
  );
  //Garbage Collection handle
  addWindow.on("close", function () {
    addWindow = null;
  });
}
```

4. ***

- handleing OS level developer tools and sections

```js
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

// Add developer tools item if not in prod
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}
```

5. ***

- Lets pass our repo link from `addWindow` to `mainWindow` using `vanillajs` and `ipcrenderer`

- at first we have to open the `static/addWindow.html` and add below code there

```html
<script>
  const electron = require("electron");
  const { ipcRenderer } = electron;

  const form = document.querySelector("form");
  form.addEventListener("submit", submitForm);

  function submitForm(e) {
    e.preventDefault();
    const repo = document.querySelector("#repo").value;
    ipcRenderer.send("repo:add", repo);
  }
</script>
```

- after that we have to catch that submitted data using `ipcrenderer`

```js
ipcMain.on("repo:add", function (e, repo) {
  console.log(repo);
  mainWindow.webContents.send("repo:add", repo);
  addWindow.close();
});
```

- lets show that `ipcrenderer` data to our `static/mainWindow.html` file

```html
<ul></ul>

<script>
  const electron = require("electron");
  const { ipcRenderer } = electron;
  const ul = document.querySelector("ul");

  ipcRenderer.on("repo:add", function (e, repo) {
    const li = document.createElement("li");
    const repoText = document.createTextNode(repo);
    li.appendChild(repoText);
    ul.appendChild(li);
  });
</script>
```

6. ***

- lets clear the Repo from the box.
- for doing this we have to create an event from `main.js` file

```js
  {
      label: 'Clear Repository',
      click(){
          mainWindow.webContents.send('repo:clear');
      }
  },

```

- now we have to catch that event to our `static/mainWindow.html` file

```html
<script>
  // Clear Repo
  ipcRenderer.on("repo:clear", function () {
    ul.innerHTML = "";
  });
</script>
```

- if we want to remove Repo but double click on it

```html
<script>
  ul.addEventListener("dblclick", removeRepo);

  function removeRepo(e) {
    e.target.remove();
  }
</script>
```

7. ***
