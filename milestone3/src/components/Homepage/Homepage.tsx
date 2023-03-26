import { HsvaColor, hexToHsva, hsvaToHex } from "@uiw/react-color";
import React from "react";
import { ColourPicker } from "../ColorPicker/ColourPicker";
import "./Homepage.css"
import { Palette } from "../PaletteAndBrush/PaletteComponent";
import { PaintBrush } from "../PaletteAndBrush/paintBrush";


interface state {
    activeColour: HsvaColor,
    activeColourPosition: number, 
    palette: HsvaColor[],
}

interface props {

}


export class Homepage extends React.Component<props, state> {
    constructor(props: props) {
        super(props)

        this.state = {
            activeColour: hexToHsva("#FFFFFF"),
            activeColourPosition: 0,
            palette: [hexToHsva("#FFFFFF"), hexToHsva("#FFFF00"), hexToHsva("#FF00FF"), hexToHsva("#00FFFF"), hexToHsva("#F0F0FF"), hexToHsva("#0FFFF0")]
        }
    }

    changeActiveColour = (colour: HsvaColor) => {
        let colourExists = false;
        this.setState({activeColour: colour})

        for(let i = 0; i < this.state.palette.length && !colourExists; i++){
            if(this.cmpHsva(this.state.palette[i], this.state.activeColour)){
                this.setState({activeColourPosition: i})
                colourExists = true;
            }
        }
        
        if(!colourExists){
            this.replacePaletteColour(colour)
        }
    }

    replacePaletteColour = (newColour: HsvaColor) => {
        let pos = this.state.activeColourPosition;
        let newPalette = {...this.state.palette}

        newPalette[pos] = newColour

        this.setState({palette: newPalette})
    }

    cmpHsva = (c1: HsvaColor, c2: HsvaColor) => {
        if(c1.h === c2.h && c1.a === c2.a && c1.s === c2.s && c1.v === c2.v){
            return true;
        }
        return false
    }


    // render is a special function that returns html
    render() {
        return (
            <div>
                {/* temporary for testing */}
                <div className="displayActive" style={{background: hsvaToHex(this.state.activeColour)}}></div>
                <div>
                    {/* menu and header style={{background: hsvaToHex(this.state.activeColour)}}*/}
                </div>
                <div className="flex">
                    {/* Image and palette area */}
                    <Palette 
                        colour={this.state.activeColour} 
                        colours={this.state.palette}
                        changeColour={this.changeActiveColour}
                    />
                </div>
                <div className="flex">
                    {/* ColourPicker and paintbrush */}
                    <ColourPicker changeColour={this.changeActiveColour} colour={this.state.activeColour}></ColourPicker>
                    <PaintBrush colour={this.state.activeColour}></PaintBrush>
                </div>
            </div>
        )
    }
}