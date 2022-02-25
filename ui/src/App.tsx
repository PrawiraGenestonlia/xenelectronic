import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './styles/app.css';
import axios from 'axios';

function App() {
  const [serverStatus, setServerStatus] = useState('');

  useEffect(() => {
    axios.get('/api/server-status').then((res) => {
      setServerStatus(JSON.stringify(res.data));
    }).catch(console.error);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Link to={window.location.href.includes('about') ? '/' : '/about'}>
          <p className='mt-[50px] bg-red-500 cursor-pointer'>PRAWIRA</p>
        </Link>
        <div>{serverStatus}</div>
      </header>
    </div>
  );
}

export default App;
