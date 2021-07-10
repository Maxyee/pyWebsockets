const electron = require('electron');
const url = require('url');
const path = require('path');
const { Menu, ipcMain } = require('electron');
const { app, BrowserWindow } = electron;
//const { mainMenuTemplate, addWindow } = require('./templates/MainMenu');

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // Load Html file to the window
    mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "./static/mainWindow.html"),
          protocol: "file",
          slashes: true,
        })
    );

    // Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    })

    // Build the menu from the template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
    addWindow = new BrowserWindow({
        width:300,
        height:200,
        title: 'Add Repository To The Box',

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
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
    addWindow.on('close', function(){
        addWindow = null;
    });
}


const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Repository',
                click(){
                    createAddWindow()
                }
            },
            {
                label: 'Clear Repository',
                click(){
                    mainWindow.webContents.send('repo:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit()
                }
            }
        ]
    }
]
        

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            }
        ]
    });
}


//Catch repo:add
ipcMain.on('repo:add', function(e, repo){
    console.log(repo);
    mainWindow.webContents.send('repo:add', repo);
    addWindow.close();
})

//module.exports = { mainWindow }