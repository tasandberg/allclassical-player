import { enableLiveReload } from 'electron-compile'
const electron = require('electron')

const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage
} = electron

enableLiveReload({ strategy: 'react-hmr' })

let gui
let audioProcess
let tray

app.dock.hide()
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (gui === null) {
    createWindow()
  }
})

function createWindow () {
  initializeGui()

  tray = new Tray(nativeImage.createFromPath('./tray.png'))
  tray.on('click', () => toggleGui())
}

function initializeGui () {
  gui = new BrowserWindow({
    width: 400,
    height: 310,
    frame: false,
    fullScreenable: false,
    resizeable: false,
    transparent: true,
    'node-integration': false,
    backgroundThrottling: false
  })

  gui.loadFile('index.html')
  gui.on('blur', () => gui.hide())
  gui.openDevTools()
  gui.on('closed', () => {
    gui.hide()
  })
}

const toggleGui = () => {
  if (gui.isVisible()) {
    gui.hide()
  } else {
    showGui()
  }
}

const showGui = () => {
  const position = getWindowPosition()
  gui.setPosition(position.x, position.y, false)
  gui.show()
  gui.focus()
}

const getWindowPosition = () => {
  const windowBounds = gui.getBounds()
  const trayBounds = tray.getBounds()

  // Center gui horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width) - (windowBounds.width / 2))

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 10)

  return {
    x: x,
    y: y
  }
}
