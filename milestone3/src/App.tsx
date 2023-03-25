import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import { MyFirstComponent } from './components/MyFirstComponent';
import { Palette } from "./components/PaletteAndBrush/PaletteComponent";
import { ColourPicker} from "./components/ColorPicker/ColourPicker";
import { HsvaColor, hexToHsva } from '@uiw/color-convert';
import { Homepage } from './components/Homepage/Homepage';

function App() {

  return (
    <div className="App">
      <header className="App-header">
       <Homepage/>
      </header>
    </div>
  );
}

export default App;
