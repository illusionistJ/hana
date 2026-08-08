import styles from './BasicLayout.module.scss'

const BasicLayout = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <div className={styles.basicLayout}>
      <div className={styles.header}>Header</div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>Footer</div>
    </div>
  )
}

export default BasicLayout
