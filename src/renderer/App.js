import icon from '../../assets/icon.svg';
import './App.css';
import { Translate } from './Translate';

function App() {
  return (
    <div className="App">
    <img src={icon} className="App-logo" alt="logo" />
      <header className="App-header">

        <Translate />
        </header>
    </div>
  );
}

export default App;
