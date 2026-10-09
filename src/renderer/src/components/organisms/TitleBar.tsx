import styles from './TitleBar.module.scss'
import { ActionIcon } from '@mantine/core'
import { IoMdClose } from 'react-icons/io'
import { FaWindowMinimize } from 'react-icons/fa6'
import { VscChromeMaximize, VscChromeRestore } from 'react-icons/vsc'
import { useState } from 'react'

const TitleBar = (): React.JSX.Element => {
  const [isMaximized, setIsMaximized] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.status}></div>
      <div className={styles.tools}>
        <ActionIcon
          size="sm"
          className={styles.toolButton}
          onClick={() => window.api.window.minimize()}
        >
          <FaWindowMinimize />
        </ActionIcon>
        <ActionIcon
          size="sm"
          className={styles.toolButton}
          onClick={() => {
            setIsMaximized(!isMaximized)
            window.api.window.toggleMaximize()
          }}
        >
          {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
        </ActionIcon>
        <ActionIcon
          size="sm"
          className={styles.toolButton}
          onClick={() => window.api.window.close()}
        >
          <IoMdClose />
        </ActionIcon>
      </div>
    </div>
  )
}

export default TitleBar
