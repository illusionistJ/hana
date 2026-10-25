export interface IpcApi {
  window: {
    minimize(): Promise<void>
    toggleMaximize(): Promise<void>
    close(): Promise<void>
    isMaximized(): Promise<boolean>
    onMaximizeChange(cb: (isMax: boolean) => void): () => void
    getVersion(): Promise<string>
  }
  config: {
    load(): Promise<AppConfig>
    save(config: AppConfig): Promise<boolean>
    selectDirectory(): Promise<string | null>
    getDefault(): Promise<AppConfig>
  }
}

export interface AppConfig {
  version: number

  general: {
    theme: 'light' | 'dark' | 'system'
    language: string
  }

  llm: {
    provider: 'ollama' | 'openai-compatible'
    baseUrl: string
    model: string
  }

  analysis: {
    autoAnalyze: boolean
    logDirectory: string
    maxLogSizeMB: number
  }
}
