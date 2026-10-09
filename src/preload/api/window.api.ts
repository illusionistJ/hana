import { ipcRenderer } from 'electron'
import { IPC } from '@shared/ipc/channels'
import type { IpcApi } from '@shared/ipc/types'

export const windowApi: IpcApi['window'] = {
  close: () => ipcRenderer.invoke(IPC.window.close),
  minimize: () => ipcRenderer.invoke(IPC.window.minimize),
  toggleMaximize: () => ipcRenderer.invoke(IPC.window.toggleMaximize),
  isMaximized: () => ipcRenderer.invoke(IPC.window.isMaximized),
  onMaximizeChange: (cb) => {
    const handler = (_: unknown, state: boolean) => cb(state)
    ipcRenderer.on(IPC.window.onMaximizeChange, handler)
    return () => ipcRenderer.removeListener(IPC.window.onMaximizeChange, handler)
  }
}
