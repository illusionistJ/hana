import { useEffect, useState } from 'react'
import {
  TextInput,
  Select,
  Switch,
  NumberInput,
  Button,
  SegmentedControl,
  Loader,
  ActionIcon,
  Tooltip,
  Stack,
  Text,
  Title
} from '@mantine/core'
import {
  IoSaveOutline,
  IoRefreshOutline,
  IoFolderOpenOutline,
  IoCheckmarkCircle,
  IoAlertCircleOutline
} from 'react-icons/io5'
import type { AppConfig } from '@shared/ipc/types'
import styles from './Settings.module.scss'

const SettingsPage = (): React.JSX.Element => {
  const [config, setConfig] = useState<AppConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  )

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async (): Promise<void> => {
    setIsLoading(true)
    setFeedback(null)
    try {
      const loaded = await window.api.config.load()
      setConfig(loaded)
    } catch (err) {
      console.error('Failed to load config:', err)
      setFeedback({ type: 'error', message: '설정값을 불러오는 중 오류가 발생했습니다.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (): Promise<void> => {
    if (!config) return
    setIsSaving(true)
    setFeedback(null)
    try {
      await window.api.config.save(config)
      setFeedback({ type: 'success', message: '설정이 성공적으로 저장되었습니다.' })
      setTimeout(() => {
        setFeedback(null)
      }, 3500)
    } catch (err) {
      console.error('Failed to save config:', err)
      setFeedback({ type: 'error', message: '설정 저장에 실패했습니다.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetToDefault = async (): Promise<void> => {
    try {
      const defaults = await window.api.config.getDefault()
      setConfig(defaults)
      setFeedback({
        type: 'success',
        message: '기본 설정값으로 복원되었습니다. 적용하려면 "저장하기"를 눌러주세요.'
      })
    } catch (err) {
      console.error('Failed to get default config:', err)
      setFeedback({ type: 'error', message: '기본 설정을 불러오는 중 오류가 발생했습니다.' })
    }
  }

  const handleSelectDirectory = async (): Promise<void> => {
    try {
      const selected = await window.api.config.selectDirectory()
      if (selected) {
        updateAnalysis('logDirectory', selected)
      }
    } catch (err) {
      console.error('Failed to select directory:', err)
    }
  }

  const updateGeneral = <K extends keyof AppConfig['general']>(
    key: K,
    value: AppConfig['general'][K]
  ): void => {
    setConfig((prev) => (prev ? { ...prev, general: { ...prev.general, [key]: value } } : null))
  }

  const updateLlm = <K extends keyof AppConfig['llm']>(
    key: K,
    value: AppConfig['llm'][K]
  ): void => {
    setConfig((prev) => (prev ? { ...prev, llm: { ...prev.llm, [key]: value } } : null))
  }

  const updateAnalysis = <K extends keyof AppConfig['analysis']>(
    key: K,
    value: AppConfig['analysis'][K]
  ): void => {
    setConfig((prev) => (prev ? { ...prev, analysis: { ...prev.analysis, [key]: value } } : null))
  }

  if (isLoading || !config) {
    return (
      <div className={styles.loadingCenter}>
        <Loader size="lg" color="blue" />
        <Text size="sm">설정을 불러오는 중입니다...</Text>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* 상단 헤더 */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <Title order={2} className={styles.title}>
            설정 (Settings)
          </Title>
          <Text className={styles.subtitle}>
            애플리케이션 환경, LLM 연결 및 로그 분석 규칙을 구성합니다.
          </Text>
        </div>

        <div className={styles.actions}>
          <Button
            variant="default"
            size="sm"
            leftSection={<IoRefreshOutline size={16} />}
            onClick={handleResetToDefault}
            disabled={isSaving}
          >
            기본값 복원
          </Button>
          <Button
            color="blue"
            size="sm"
            leftSection={<IoSaveOutline size={16} />}
            onClick={handleSave}
            loading={isSaving}
          >
            저장하기
          </Button>
        </div>
      </div>

      {/* 피드백 배너 */}
      {feedback && (
        <div
          className={`${styles.feedbackBanner} ${
            feedback.type === 'success' ? styles.successBanner : styles.errorBanner
          }`}
        >
          {feedback.type === 'success' ? (
            <IoCheckmarkCircle size={18} />
          ) : (
            <IoAlertCircleOutline size={18} />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* 1. 일반 설정 카드 */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.cardTitle}>일반 설정 (General)</div>
            <div className={styles.cardDescription}>
              화면 테마 및 사용자 인터페이스 언어를 지정합니다.
            </div>
          </div>
        </div>

        <div className={styles.fieldGrid}>
          <Stack gap={6}>
            <Text size="sm" fw={500}>
              테마 (Theme)
            </Text>
            <SegmentedControl
              value={config.general.theme}
              onChange={(val) => updateGeneral('theme', val as AppConfig['general']['theme'])}
              data={[
                { label: '다크 모드', value: 'dark' },
                { label: '라이트 모드', value: 'light' },
                { label: '시스템 설정', value: 'system' }
              ]}
            />
          </Stack>

          <Select
            label="언어 (Language)"
            description="인터페이스 기본 언어"
            value={config.general.language}
            onChange={(val) => updateGeneral('language', val || 'ko')}
            data={[
              { label: '한국어 (ko)', value: 'ko' },
              { label: 'English (en)', value: 'en' }
            ]}
          />
        </div>
      </div>

      {/* 2. LLM 모델 설정 카드 */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.cardTitle}>LLM 모델 설정 (LLM Provider)</div>
            <div className={styles.cardDescription}>
              분석 및 요약에 사용할 언어 모델과 엔드포인트를 지정합니다.
            </div>
          </div>
        </div>

        <Stack gap={16}>
          <Stack gap={6}>
            <Text size="sm" fw={500}>
              제공자 (Provider)
            </Text>
            <SegmentedControl
              value={config.llm.provider}
              onChange={(val) => updateLlm('provider', val as AppConfig['llm']['provider'])}
              data={[
                { label: 'Ollama (로컬 실행)', value: 'ollama' },
                { label: 'OpenAI 호환 API', value: 'openai-compatible' }
              ]}
            />
          </Stack>

          <div className={styles.fieldGrid}>
            <TextInput
              label="Base URL (API 주소)"
              description={
                config.llm.provider === 'ollama'
                  ? 'Ollama 기본 주소: http://localhost:11434'
                  : 'OpenAI 호환 API 엔드포인트'
              }
              placeholder={
                config.llm.provider === 'ollama'
                  ? 'http://localhost:11434'
                  : 'https://api.openai.com/v1'
              }
              value={config.llm.baseUrl}
              onChange={(e) => updateLlm('baseUrl', e.currentTarget.value)}
            />

            <TextInput
              label="모델 이름 (Model)"
              description="추론에 사용할 모델명"
              placeholder={config.llm.provider === 'ollama' ? 'gemma3' : 'gpt-4o-mini'}
              value={config.llm.model}
              onChange={(e) => updateLlm('model', e.currentTarget.value)}
            />
          </div>
        </Stack>
      </div>

      {/* 3. 분석 및 로그 설정 카드 */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.cardTitle}>로그 및 분석 설정 (Analysis & Logs)</div>
            <div className={styles.cardDescription}>
              로그 수집 경로와 자동 분석 동작 옵션을 구성합니다.
            </div>
          </div>
        </div>

        <Stack gap={16}>
          <Switch
            label="자동 분석 활성화 (Auto Analyze)"
            description="새로운 로그 데이터가 유입되거나 파일이 변경되면 자동으로 분석을 실행합니다."
            checked={config.analysis.autoAnalyze}
            onChange={(e) => updateAnalysis('autoAnalyze', e.currentTarget.checked)}
          />

          <TextInput
            label="로그 디렉터리 경로 (Log Directory)"
            description="분석 대상 로그 파일이 저장되는 디렉터리"
            placeholder="경로를 입력하거나 우측 폴더 버튼을 눌러 선택하세요"
            value={config.analysis.logDirectory}
            onChange={(e) => updateAnalysis('logDirectory', e.currentTarget.value)}
            rightSection={
              <Tooltip label="폴더 찾아보기">
                <ActionIcon variant="subtle" color="blue" onClick={handleSelectDirectory}>
                  <IoFolderOpenOutline size={18} />
                </ActionIcon>
              </Tooltip>
            }
          />

          <NumberInput
            label="최대 허용 로그 크기 (Max Log Size)"
            description="분석 가능한 단일 파일의 최대 크기"
            value={config.analysis.maxLogSizeMB}
            onChange={(val) => updateAnalysis('maxLogSizeMB', typeof val === 'number' ? val : 100)}
            min={1}
            max={10000}
            suffix=" MB"
          />
        </Stack>
      </div>
    </div>
  )
}

export default SettingsPage
