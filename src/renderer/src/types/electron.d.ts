import type { IpcApi } from '@shared/ipc/types'

declare global {
  interface Window {
    api: IpcApi
  }
}
