import { useState, useEffect } from 'react'
import styles from './SideBar.module.scss'
import { UserButton } from '@renderer/components/molecules/button/user/UserButton'
import { ScrollArea, Group, Code } from '@mantine/core'
import Logo from '@renderer/assets/images/logo.png'

const SideBar = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)
  const [version, setVersion] = useState<string | null>(null)

  useEffect(() => {
    window.api.window.getVersion().then(setVersion)
  }, [])

  const toggleSidebar = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.header}>
        {' '}
        <Group justify="space-between">
          <div className={styles.logo}>
            <img src={Logo} alt="Logo" width={30} height={30} />
            <span>Hana</span>
          </div>
          <Code className={styles.version}>v{version}</Code>
        </Group>
      </div>
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
