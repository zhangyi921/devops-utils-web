import { useState } from 'react'
import Ter from './terminal';
import Home from './Home';

function App() {

  const [page, setPage] = useState<"home" | "terminal">('home');

  // The container that xterm.js will use to render the terminal
  return <div >
    <button onClick={() => {
      setPage('home')
    }}>Home</button>
    <button onClick={() => {
      setPage('terminal')
    }}>Terminal</button>
    { page == 'home' && <Home /> }
    { page == 'terminal' && <Ter />}
  </div>;
}

export default App
