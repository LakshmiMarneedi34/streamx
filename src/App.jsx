
import { Provider } from 'react-redux'
import './App.css'
import Body from './components/Body'
import appStore from './utils/appStore'

function App() {
  return (
    <Provider store={appStore}>
        <div className="min-h-screen overflow-x-hidden overflow-y-auto">
        <Body />
      </div>
    </Provider>
  );
}


export default App
