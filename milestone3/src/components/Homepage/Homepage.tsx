import { HsvaColor, hsvaToHex } from "@uiw/react-color";
import React from "react";
import { ColourPicker } from "../ColorPicker/ColourPicker";
import "./Homepage.css"
import { Menu } from "../menu/Menu";



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

        const initialColour = { h: 0, s: 0, v: 100, a: 1}

        this.state = {
            activeColour: initialColour,
            activeColourPosition: 0,
            palette: [initialColour]
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
        let newPalette = this.state.palette

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
                <div>
                    {/* menu and header style={{background: hsvaToHex(this.state.activeColour)}}*/}
                    <Menu></Menu>
                </div>
                {/* temporary for testing */}
                <div className="displayActive" style={{background: hsvaToHex(this.state.activeColour)}}></div>
                <div className="flex">
                    {/* Image and palette area */}
                </div>
                <div className="flex colourPicker">
                    {/* ColourPicker and paintbrush */}
                    <ColourPicker changeColour={this.changeActiveColour} colour={this.state.activeColour}></ColourPicker>
                </div>
            </div>
        )
    }
}