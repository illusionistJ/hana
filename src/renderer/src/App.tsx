import { HashRouter, useRoutes } from 'react-router-dom'
import { routes } from '@renderer/router/routes'
import { JSX } from 'react/jsx-runtime'
import BasicTemplate from './components/templates/Basic'

const RouteRenderer = (): JSX.Element | null => {
  const element = useRoutes(routes)
  return element
}

function App(): React.JSX.Element {
  return (
    <HashRouter>
      <BasicTemplate>
        <RouteRenderer />
      </BasicTemplate>
    </HashRouter>
  )
}

export default App
