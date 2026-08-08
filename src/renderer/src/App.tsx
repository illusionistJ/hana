import { HashRouter, useRoutes } from 'react-router-dom'
import { routes } from '@renderer/router/routes'
import BasicLayout from '@renderer/components/layouts/BasicLayout'
import { JSX } from 'react/jsx-runtime'

const RouteRenderer = (): JSX.Element | null => {
  const element = useRoutes(routes)
  return element
}

function App(): React.JSX.Element {
  return (
    <HashRouter>
      <BasicLayout>
        <RouteRenderer />
      </BasicLayout>
    </HashRouter>
  )
}

export default App
