import React from 'react';
import Header from './Header';
import GarageButton from './GarageButton';
import { Provider as AuthProvider } from '../context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Header />
      <div className="ui container" style={{marginTop: 100}}>
        <GarageButton />
      </div>   
    </div>
    </AuthProvider>
  );
}

export default App;
