
import { Provider } from 'react-redux'
import './App.css'
import Body from './components/Body'
import appStore from './utils/appStore'
import 'primereact/resources/themes/lara-dark-indigo/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


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
