// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, session } = require('electron')
const structuredClone = require('core-js-pure/stable/structured-clone')
const path = require('path')
const fs = require('fs')
const debug = process.env.NODE_ENV === 'development'

async function createWindow() {
  // create the browser window
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  })

  // load the index.html
  if (debug) {
    // try to load vue-devtools-extension
    const vueDevToolsExtPath = path.join(process.env.LOCALAPPDATA, false ? 'Google/Chrome' : 'Microsoft/Edge', 'User Data/Default/Extensions', 'ljjemllljcmogpfapbkkighbhhppjdbg')
    if (fs.existsSync(vueDevToolsExtPath)) {
      const vers = fs.readdirSync(vueDevToolsExtPath).sort()
      if (vers.length > 0) {
        const extPath = path.join(vueDevToolsExtPath, vers[vers.length - 1])
        await session.defaultSession.loadExtension(extPath)
      }
    } else {
      console.log('Unable to load Vue Devtools.')
    }

    // open the DevTools
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(`http://127.0.0.1:3000/index.html`)
  }
  else {
    mainWindow.loadFile('dist/index.html')
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  await createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// ipcMain.handle('fn-process', (e, ...args) => {
//   if (typeof args[0] !== 'string') {
//     return { err: true, msg: 'Invalid fn' }
//   }
//   switch (args[0]) {
//     case 'getCPUUsage': return structuredClone(process.getCPUUsage())
//   }
// })
