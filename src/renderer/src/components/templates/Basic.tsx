import TitleBar from '@renderer/components/organisms/TitleBar'
import styles from './Basic.module.scss'

const BasicTemplate = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <TitleBar />
      <main className={styles.body}>{children}</main>
    </div>
  )
}

export default BasicTemplate
