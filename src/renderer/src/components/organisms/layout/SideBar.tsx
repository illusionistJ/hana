import { useState } from 'react'
import styles from './SideBar.module.scss'
import { UserButton } from '@renderer/components/molecules/button/user/UserButton'
import { ScrollArea } from '@mantine/core'

const SideBar = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.header}></div>
      <ScrollArea className={styles.links}>
        <div className={styles.section}>test</div>
      </ScrollArea>

      <div className={styles.footer}>
        <UserButton />
      </div>
    </nav>
  )
}

export default SideBar
