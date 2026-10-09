import TitleBar from '@renderer/components/organisms/TitleBar'
import styles from './Basic.module.scss'
import StandardTemplate from './Standard'

const BasicTemplate = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <TitleBar />

      <main className={styles.body}>
        <StandardTemplate>{children}</StandardTemplate>
      </main>
    </div>
  )
}

export default BasicTemplate
