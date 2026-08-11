import { HashRouter, useRoutes } from 'react-router-dom'
import { routes } from '@renderer/router/routes'
import BasicLayout from '@renderer/components/layouts/BasicLayout'
import { JSX } from 'react/jsx-runtime'
import { ConfigProvider } from 'antd'

const RouteRenderer = (): JSX.Element | null => {
  const element = useRoutes(routes)
  return element
}

function App(): React.JSX.Element {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: 'transparent',
            triggerBg: 'transparent',
            triggerColor: 'green',
            headerHeight: '32px'
          }
        }
      }}
    >
      <HashRouter>
        <BasicLayout>
          <RouteRenderer />
        </BasicLayout>
      </HashRouter>
    </ConfigProvider>
  )
}

export default App
