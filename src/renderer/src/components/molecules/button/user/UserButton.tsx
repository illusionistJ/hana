import { Avatar, Group, Text, UnstyledButton } from '@mantine/core'
import styles from './UserButton.module.scss'
import { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa6'

export const UserButton = (): React.JSX.Element => {
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Seungil Jeon',
    email: 's1@example.com'
  })

  return (
    <UnstyledButton className={styles.user}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
          alt=""
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user?.name}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.email}
          </Text>
        </div>

        <FaChevronRight size={12} />
      </Group>
    </UnstyledButton>
  )
}
