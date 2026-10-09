import { useState } from 'react'
import styles from './SideBar.module.scss'

const SideBar = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.navbar}>
      <nav>
        <div className={styles.section}>test</div>
        <div className={styles.section}>test</div>
      </nav>
    </div>
  )
}

export default SideBar
