import { app } from 'electron'

import fs from 'node:fs/promises'
import path from 'node:path'
import { AppConfig } from '@shared/ipc/types'

const defaultConfig: AppConfig = {
  version: 1,

  general: {
    theme: 'dark',
    language: 'ko'
  },

  llm: {
    provider: 'ollama',
    baseUrl: 'http://localhost:11434',
    model: 'gemma3'
  },

  analysis: {
    autoAnalyze: true,
    logDirectory: '',
    maxLogSizeMB: 100
  }
}

export function deepMerge(target: AppConfig, source: unknown): AppConfig {
  if (!source || typeof source !== 'object') {
    return structuredClone(target)
  }

  const src = source as Partial<AppConfig>

  return {
    ...target,
    ...src,
    general: { ...target.general, ...src.general },
    llm: { ...target.llm, ...src.llm },
    analysis: { ...target.analysis, ...src.analysis }
  }
}

export function getConfigPath(): string {
  return path.join(app.getPath('userData'), 'settings.json')
}

export function getDefaultConfig(): AppConfig {
  return structuredClone(defaultConfig)
}

export async function loadConfig(): Promise<AppConfig> {
  const configPath = getConfigPath()
  try {
    const raw = await fs.readFile(configPath, 'utf-8')
    const parsed = JSON.parse(raw)
    return deepMerge(defaultConfig, parsed)
  } catch (error) {
    const err = error as NodeJS.ErrnoException

    // 1. 설정 파일이 없는 경우: 기본 설정 파일 생성 후 반환
    if (err.code === 'ENOENT') {
      await saveConfig(defaultConfig)
      return structuredClone(defaultConfig)
    }

    // 2. JSON 문법 오류 또는 파일 손상인 경우: 로그 출력, 손상 파일 백업 후 기본 설정으로 복구
    console.error(
      `[ConfigService] Failed to load config from "${configPath}". Falling back to default:`,
      error
    )

    try {
      const backupPath = `${configPath}.corrupted.${Date.now()}`
      await fs.rename(configPath, backupPath).catch(() => {})
      await saveConfig(defaultConfig)
    } catch (recoveryError) {
      console.error('[ConfigService] Failed to recover default config:', recoveryError)
    }

    return structuredClone(defaultConfig)
  }
}

export async function saveConfig(config: AppConfig): Promise<void> {
  const configPath = getConfigPath()
  const dir = path.dirname(configPath)

  await fs.mkdir(dir, { recursive: true })

  const tempPath = path.join(
    dir,
    `.settings.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`
  )

  try {
    await fs.writeFile(tempPath, JSON.stringify(config, null, 2), 'utf-8')

    try {
      await fs.rename(tempPath, configPath)
    } catch {
      // Windows 환경에서 대상 파일 락/권한 문제 등으로 rename 실패 시 copyFile + unlink 시도
      await fs.copyFile(tempPath, configPath)
      await fs.unlink(tempPath).catch(() => {})
    }
  } catch (error) {
    await fs.unlink(tempPath).catch(() => {})
    throw error
  }
}
