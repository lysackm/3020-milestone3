import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import { MyFirstComponent } from './components/MyFirstComponent';
import { Palette } from "./components/PaletteAndBrush/PaletteComponent";
import { PaintBrush } from "./components/PaletteAndBrush/paintBrush";
import { ColourPicker} from "./components/ColorPicker/ColourPicker";
import { HsvaColor, hexToHsva,rgbaToHsva, RgbaColor } from '@uiw/color-convert';

function App() {
  let colours: HsvaColor[] = [hexToHsva("#FFFFFF"), hexToHsva("#FFFF00"), hexToHsva("#FF00FF"), hexToHsva("#00FFFF"), hexToHsva("#F0F0FF"), hexToHsva("#0FFFF0")]
  let color: RgbaColor = { r: 249, g: 234, b: 187, a: 1};
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
        {/* this is how you add your component to other things */}
        <MyFirstComponent showButton={true}></MyFirstComponent>
        <Palette colour = {colours[2]} colours={colours}/>
        <PaintBrush colour = {rgbaToHsva(color)}></PaintBrush>
        <ColourPicker> </ColourPicker>
      </header>
    </div>
  );
}

export default App;
