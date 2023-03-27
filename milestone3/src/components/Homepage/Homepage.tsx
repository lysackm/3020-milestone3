import { HsvaColor, hexToHsva } from "@uiw/react-color";
import React from "react";
import { ColourPicker } from "../ColorPicker/ColourPicker";
import "./Homepage.css"
import { Menu } from "../menu/Menu";
import { Palette } from "../PaletteAndBrush/PaletteComponent";
import { PaintBrush } from "../PaletteAndBrush/paintBrush";
import { ImageArea } from "../ImageArea/ImageArea";


export interface Image {
    link: string,
    painting: string
}

interface state {
    activeColour: HsvaColor,
    activeColourPosition: number, 
    palette: HsvaColor[],
    paletteHistory: HsvaColor[][],
    colorHistory: HsvaColor[],
    imageHistory: Image[],
    changed: boolean
}

interface props {

}


export class Homepage extends React.Component<props, state> {
    constructor(props: props) {
        super(props)

        this.state = {
            activeColour: hexToHsva("#FFFFFF"),
            activeColourPosition: 0,
            palette: [hexToHsva("#FFFFFF"), hexToHsva("#FFFF00"), hexToHsva("#FF00FF"), hexToHsva("#00FFFF"), hexToHsva("#F0F0FF"), hexToHsva("#0FFFF0")],
            paletteHistory: [],
            colorHistory: [],
            imageHistory: [],
            changed: true
        }
    }

    changeActiveColour = (colour: HsvaColor) => {
        this.setState({activeColour: colour}, () => {
            this.checkColour(colour)
        })

    }

    addColour = (colour: HsvaColor) => {
        let newColourHistory = this.state.colorHistory
        newColourHistory.unshift(colour)
        this.setState({colorHistory: newColourHistory})
    }

    addPalette = (palette: HsvaColor[]) => {
        const newPalette: HsvaColor[] = []

        palette.forEach(colour => newPalette.push(colour))

        let newPaletteHistory = this.state.paletteHistory
        newPaletteHistory.unshift(newPalette)
        this.setState({paletteHistory: newPaletteHistory})
    }
    
    loadPalette = (palette: HsvaColor[]) => {
        this.setState({palette: palette})
        this.setState({activeColour: palette[0]})
    }

    loadColour = (colour: HsvaColor) => {
        this.setState({changed: true})
    }

    checkColour = (colour: HsvaColor) => {
        let colourExists = false;
        let oldColour: HsvaColor = this.state.activeColour
        this.setState({activeColour: colour})

        for(let i = 0; i < this.state.palette.length && !colourExists; i++){
            if(this.cmpHsva(this.state.palette[i], colour)){
                console.log(i, this.state.palette, "i")
                this.setState({activeColourPosition: i})
                colourExists = true;
            }
        }
        
        if(!colourExists){
            console.log("not exists")
            this.replacePaletteColour(colour)
        }else{
            if(this.state.changed){
                this.setState({changed: false})
                this.addColour(oldColour)
                this.addPalette(this.state.palette)
            }
        }
    }

    replacePaletteColour = (newColour: HsvaColor) => {
        let pos = this.state.activeColourPosition;
        let newPalette = this.state.palette

        newPalette[pos] = {...newColour}

        this.setState({palette: newPalette})
        this.setState({changed: true})
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
                    <Menu
                        paletteHistory={this.state.paletteHistory}
                        colourHistory={this.state.colorHistory}
                        imageHistory={this.state.imageHistory}
                        changeColour={this.checkColour}
                        loadPalette={this.loadPalette}
                    />
                </div>
                <div className="flex">
                    {/* Image and palette area */}
                    <ImageArea activeColour={this.state.activeColour}></ImageArea>
                    <Palette
                        colour={this.state.activeColour}
                        colours={this.state.palette}
                        changeColour={this.changeActiveColour}
                    />
                </div>
                <div className="flex colourPicker">
                    {/* ColourPicker and paintbrush */}
                    <ColourPicker changeColour={this.changeActiveColour} colour={this.state.activeColour}></ColourPicker>
                    <PaintBrush colour={this.state.activeColour}></PaintBrush>
                </div>
            </div>
        )
    }
}