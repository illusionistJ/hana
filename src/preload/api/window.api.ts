import { ipcRenderer } from 'electron'
import { IPC } from '@shared/ipc/channels'
import type { IpcApi } from '@shared/ipc/types'

export const windowApi: IpcApi['window'] = {
  close: () => ipcRenderer.invoke(IPC.window.close),
  minimize: () => ipcRenderer.invoke(IPC.window.minimize),
  toggleMaximize: () => ipcRenderer.invoke(IPC.window.toggleMaximize),
  isMaximized: () => ipcRenderer.invoke(IPC.window.isMaximized)
}
