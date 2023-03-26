import React from 'react';
import './App.css';
import { Homepage } from './components/Homepage/Homepage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#000000',
    },
  },
});

function App() {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <Homepage/>
        </header>
      </ThemeProvider>
    <div className="App">
      <header className="App-header">
      <Homepage/>
      </header>
    </div>
  );
}

export default App;
