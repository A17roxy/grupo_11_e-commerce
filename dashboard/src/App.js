import React from 'react';
import Dashboard from './components/dashboard';
import './App.css'; /* USAR PARA DAR ESTILO */

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard de Bits & Sound</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;

