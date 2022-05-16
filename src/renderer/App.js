import './App.css';
import SideNav from './SideNav';
import MainHeader from './MainHeader';
import LinkForm from './LinkForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <MainHeader />
      <LinkForm />
      <SideNav />
    </div>
  );
}

export default App;
