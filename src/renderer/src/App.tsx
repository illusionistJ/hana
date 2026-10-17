import { HashRouter } from 'react-router-dom'
import { RouteRenderer } from './router'

import BasicTemplate from './components/templates/Basic'

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
