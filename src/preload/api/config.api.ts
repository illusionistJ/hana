import { ipcRenderer } from 'electron'
import { IPC } from '@shared/ipc/channels'
import type { IpcApi, AppConfig } from '@shared/ipc/types'

export const configApi: IpcApi['config'] = {
  load: () => ipcRenderer.invoke(IPC.config.load),
  save: (config: AppConfig) => ipcRenderer.invoke(IPC.config.save, config),
  selectDirectory: () => ipcRenderer.invoke(IPC.config.selectDirectory),
  getDefault: () => ipcRenderer.invoke(IPC.config.getDefault)
}
