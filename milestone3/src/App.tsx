import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import { MyFirstComponent } from './components/MyFirstComponent';
import { ColourPicker} from "./components/ColorPicker/ColourPicker";
import { ImageArea } from "./components/ImageArea/ImageArea"
import './components/ImageArea/ImageArea.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        
        <div className="main">
          <ImageArea></ImageArea>
          <div style={{display: "block"}}>
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
              {/* this is how you add your component to other things */}
              <MyFirstComponent showButton={true}></MyFirstComponent>
              <ColourPicker></ColourPicker>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
