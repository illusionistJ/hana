import SideBar from '@renderer/components/organisms/layout/SideBar'
import styles from './Standard.module.scss'

const StandardTemplate = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default StandardTemplate
