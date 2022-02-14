// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')

// core-js
const structuredClone = require('core-js-pure/stable/structured-clone')

// expose
contextBridge.exposeInMainWorld('fs', fs)

contextBridge.exposeInMainWorld('ipcRenderer', {
  invoke: ipcRenderer.invoke,
  postMessage: ipcRenderer.postMessage,
  send: ipcRenderer.send,
})

contextBridge.exposeInMainWorld('path', path)

contextBridge.exposeInMainWorld('process', {
  env: structuredClone(process.env),
  getCPUUsage: process.getCPUUsage,
  getProcessMemoryInfo: process.getProcessMemoryInfo,
  versions: structuredClone(process.versions),
})

contextBridge.exposeInMainWorld('utils', require('./utils'))

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
