import { colors } from '@mui/material';
import './App.css';
import NavMenu from './Components/NavMenu/NavMenu';

function App() {
  return (
    <div className="App">
      <header>
        <NavMenu className='Nav' />
      </header>
    </div>
  );
}

export default App;
