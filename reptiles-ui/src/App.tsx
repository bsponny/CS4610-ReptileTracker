import { useState } from 'react';
import { Router } from './Router';
import './App.css';
import useToken from './components/Auth';

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
