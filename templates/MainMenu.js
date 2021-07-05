const { app, BrowserWindow } = require("electron");
const url = require('url');
const path = require('path');


//handle create add window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width:300,
        height:200,
        title: 'Add Repository To The Box'
    });
    // Load Html file to the window
    addWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "./../static/addWindow.html"),
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
                label: 'Clear Repository'
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

module.exports = { mainMenuTemplate }
