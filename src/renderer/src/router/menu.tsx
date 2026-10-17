import HomePage from '@renderer/pages/Home'
import WorkspacePage from '@renderer/pages/Workspace'
import SettingsPage from '@renderer/pages/config/Settings'
import DatabasePage from '@renderer/pages/data/Database'
import FilesPage from '@renderer/pages/data/Files'
import { IoHome } from 'react-icons/io5'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdOutlineWork } from 'react-icons/md'
import { TbDatabaseSearch } from 'react-icons/tb'
import { FaFile } from 'react-icons/fa'

export type MenuItem = {
  link: string
  element?: React.JSX.Element
  label: string
  icon?: React.JSX.Element
  shortcut?: string
  links?: MenuItem[]
}

export const basicMenu: MenuItem[] = [
  {
    link: '/',
    element: <HomePage />,
    label: 'Home',
    icon: <IoHome />
  },
  {
    link: '/workspace',
    element: <WorkspacePage />,
    label: 'Workspace',
    icon: <MdOutlineWork />
  }
]

export const dataMenu: MenuItem[] = [
  {
    link: '/data/databases',
    element: <DatabasePage />,
    label: 'Databases',
    icon: <TbDatabaseSearch />
  },
  {
    link: '/data/files',
    element: <FilesPage />,
    label: 'Files',
    icon: <FaFile />
  }
]

export const configMenu: MenuItem[] = [
  {
    link: '/settings',
    label: 'Settings',
    icon: <IoSettingsSharp />,
    element: <SettingsPage />
    // links: [
    //   {
    //     link: '/settings/general',
    //     element: <HomePage />,
    //     label: 'General'
    //   }
    // ]
  }
]

type RouteEntry = {
  path: string
  element: React.JSX.Element
}

export const flattenMenuItems = (items: MenuItem[]): RouteEntry[] => {
  const result: RouteEntry[] = []

  const dfs = (nodes: MenuItem[]): void => {
    for (const { link, element, links } of nodes) {
      if (element) result.push({ path: link, element: element }) // 부모를 먼저 방문
      if (links?.length) dfs(links) // 이후 자식으로 깊이 탐색
    }
  }

  dfs(items)
  return result
}

export const routes: RouteEntry[] = flattenMenuItems([...basicMenu, ...dataMenu, ...configMenu])
