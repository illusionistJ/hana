import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styles from './SideBar.module.scss'
import { UserButton } from '@renderer/components/molecules/button/user/UserButton'
import { ScrollArea, NavLink } from '@mantine/core'
import { basicMenu, dataMenu, configMenu } from '@renderer/router/menu'

const SideBar = (): React.JSX.Element => {
  // const [isOpen, setIsOpen] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    // window.api.window.getVersion().then(setVersion)
    // setActive(pathname)
  }, [])

  // const toggleSidebar = (): void => {
  //   setIsOpen(!isOpen)
  // }

  return (
    <nav className={styles.navbar}>
      <ScrollArea className={styles.links}>
        <div className={styles.section}>
          {basicMenu.map((item) => (
            <NavLink
              key={item.link}
              component={Link}
              to={item.link}
              label={item.label}
              leftSection={item.icon}
              className={
                pathname == item.link ? `${styles.link} ${styles.linkActive}` : `${styles.link}`
              }
            />
          ))}
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Data Sources</div>
          {dataMenu.map((item) => (
            <NavLink
              key={item.link}
              component={Link}
              to={item.link}
              label={item.label}
              leftSection={item.icon}
              className={
                pathname == item.link ? `${styles.link} ${styles.linkActive}` : `${styles.link}`
              }
            />
          ))}
        </div>
      </ScrollArea>
      <div className={styles.footer}>
        <div className={styles.section}>
          {configMenu.map((item) => (
            <NavLink
              key={item.link}
              component={Link}
              to={item.link}
              label={item.label}
              leftSection={item.icon}
              className={
                pathname == item.link ? `${styles.link} ${styles.linkActive}` : `${styles.link}`
              }
            />
          ))}
        </div>
        <div className={styles.section}>
          <UserButton />
        </div>
      </div>
    </nav>
  )
}

export default SideBar
