import React from "react";
import {ColorResult, RgbaColor, rgbaToHex} from "@uiw/color-convert";
import {HslaColor, hslaToHsva, hsvaToHsla, hsvaToRgba, rgbaToHsva, Wheel} from "@uiw/react-color";
import "./ColorPicker.css"
import { ColourSlider } from "./ColourSlider";

interface props {}

interface state {
    colour: RgbaColor
}

export class ColourPicker extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            colour: { r: 255, g: 255, b: 255, a: 1}
        }  
    }

    calculateComplement = () => {
        let hsva = rgbaToHsva(this.state.colour)
        let hsla: HslaColor = hsvaToHsla(hsva)

        hsla = { ...hsla, h: (hsla.h + 180) % 360 }
        
        hsva = hslaToHsva(hsla)
        return hsvaToRgba(hsva)
    }

    swapToComplement = () => {
        this.setState({colour: this.calculateComplement()})
    }

    adjustSlider = (value: number, sliderColour: string) => {
        let newColour = this.state.colour

        if(sliderColour === 'r'){
            newColour = { ...this.state.colour, r: value}
        }else if(sliderColour === 'g'){
            newColour = { ...this.state.colour, g: value}
        }else if(sliderColour === 'b'){
            newColour = { ...this.state.colour, b: value}
        }

        this.setState({colour: newColour})
    }

    render() {
        return (
            <div className={"colorPicker"}>
                <div className={"block"} style={{background: rgbaToHex(this.state.colour)}}/>
                <div className={"display"}>
                    <ColourSlider colour={this.state.colour} colourName={"r"} updateColour={this.adjustSlider}></ColourSlider>
                    <ColourSlider colour={this.state.colour} colourName={"g"} updateColour={this.adjustSlider}></ColourSlider>
                    <ColourSlider colour={this.state.colour} colourName={"b"} updateColour={this.adjustSlider}></ColourSlider>
                    <div className={"complement"}>
                        <div className={"complement-color"} style={{background: rgbaToHex(this.calculateComplement())}}/>

                        <div className={"swap"} onClick={this.swapToComplement}/>
                    </div>
                </div>
                <div>
                    <Wheel
                        className={"wheel"}
                        color={rgbaToHsva(this.state.colour)}
                        onChange={(colour: ColorResult) => { this.setState({colour: colour.rgba}) }}
                        width={200}
                        height={200}
                    />
                </div>
            </div>
        )
}  
}  
