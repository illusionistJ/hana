import { JSX } from 'react/jsx-runtime'
import { useRoutes } from 'react-router-dom'
import { routes } from './menu'

export const RouteRenderer = (): JSX.Element | null => {
  const element = useRoutes(routes)
  return element
}
