import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { windowApi } from './api/window.api'
import type { IpcApi } from '@shared/ipc/types'

// Custom APIs for renderer
const api: IpcApi = { window: windowApi }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
