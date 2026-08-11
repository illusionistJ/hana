import React, { useState } from 'react'
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import styles from './BasicLayout.module.scss'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />)
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5')
  // ])
]

const BasicLayout = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  const currentYear = new Date().getFullYear()

  return (
    <Layout className={styles.basicLayout} style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={styles.sider}
      >
        <div className={styles.logo} />
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header className={styles.header} />
        <Content className={styles.content}>{children}</Content>
        <Footer className={styles.footer}>©{currentYear} Created by s1</Footer>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
