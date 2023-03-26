import React from "react";
import {ColorResult, HsvaColor, hslaToHsva, hsvaToHex, hsvaToHsla, hsvaToRgba, rgbaToHsva} from "@uiw/color-convert";
import {Wheel} from "@uiw/react-color";
import "./ColorPicker.css"
import { ColourSlider } from "./ColourSlider";
import { TextField } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface props {
    changeColour: (colour: HsvaColor) => void,
    colour: HsvaColor
}

interface state {
    mode: number
}

export class ColourPicker extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            mode: 1
        }  
    }

    calculateComplement = () => {
        let hsva: HsvaColor = this.props.colour

        hsva = { ...hsva, h: (hsva.h + 180) % 360 }
        
        return hsva
    }

    getWheelColour = () => {
        let hsva: HsvaColor = this.props.colour

        hsva = { ...hsva, v: 100}
        
        return hsva
    }

    setWheelColour = (colour: ColorResult) => {
        let hsva: HsvaColor = colour.hsva
        let value = this.props.colour.v
        hsva = { ...hsva, v: value}

        this.props.changeColour(hsva)
    }

    swapToComplement = () => {
        this.props.changeColour(this.calculateComplement())
    }

    adjustSlider = (value: number, sliderColour: string) => {
        let newColour = this.props.colour

        if(sliderColour === 'h'){
            newColour = { ...this.props.colour, h: value}
        }else if(sliderColour === 's'){
            newColour = { ...this.props.colour, s: value}
        }else if(sliderColour === 'v'){
            newColour = { ...this.props.colour, v: value}
        }

        this.props.changeColour(newColour)
    }

    tabColour = (tabNum: number) => {
        if(this.state.mode === tabNum) {
            return "lightgray"
        }
        return "darkgray"
    }

    switchTabs = (tabPressed: number) => {
        this.setState({mode: tabPressed})
    }

    handleNumberInput = (value: string, className: string) => {
        let hsva = this.props.colour

        let num: number = +value.replaceAll(/[^0-9]/g, "")
        num = Math.round(num)
        
        if(className && className.indexOf("rgb") > -1){
            let rgba = hsvaToRgba(hsva)
            if(className.indexOf("red") > -1){
                rgba = { ...rgba, r: Math.min(num, 255)}
            }else if(className.indexOf("green") > -1){
                rgba = { ...rgba, g: Math.min(num, 255)}
            }else if(className.indexOf("blue") > -1){
                rgba = { ...rgba, b: Math.min(num, 255)}
            }
            hsva = rgbaToHsva(rgba)
        } else if(className && className.indexOf("hsl") > -1){
            let hsla = hsvaToHsla(hsva)
            if(className.indexOf("hue") > -1){
                hsla = { ...hsla, h: Math.min(num, 359)}
            }else if(className.indexOf("saturation") > -1){
                hsla = { ...hsla, s: Math.min(num, 99)}
            }else if(className.indexOf("light") > -1){
                hsla = { ...hsla, l: Math.min(num, 99)}
            }
            hsva = hslaToHsva(hsla)
        }
        this.props.changeColour(hsva)
    }

    clipboard = () => {
        navigator.clipboard.writeText(hsvaToHex(this.props.colour))
    }

    render() {
        return (
            <div>
                <div className={"colorPicker"}>
                    <div className={"block"} style={{background: hsvaToHex(this.props.colour)}}/>
                    <div className={"display"}>
                        {this.state.mode === 1 && 
                            <>
                                <ColourSlider 
                                    colour={this.props.colour} 
                                    colourName={"h"} 
                                    updateColour={this.adjustSlider}
                                    max={360}
                                />
                                <ColourSlider 
                                    colour={this.props.colour} 
                                    colourName={"s"} 
                                    updateColour={this.adjustSlider} 
                                    max={100}
                                />
                                <ColourSlider 
                                    colour={this.props.colour} 
                                    colourName={"v"} 
                                    updateColour={this.adjustSlider} 
                                    max={100}
                                />
                            </>
                        }   
                        {this.state.mode === 2 &&
                            <div>
                                <div className={"details"}>
                                    <TextField
                                        label={"Red"}
                                        className={"numberInput"}
                                        size={"small"}
                                        value={hsvaToRgba(this.props.colour).r}
                                        onChange={(e) => {this.handleNumberInput(e.target.value, "rgb red")}}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]* '}}
                                    />
                                    <TextField
                                        label={"Green"}
                                        className={"numberInput"}
                                        size={"small"}
                                        value={hsvaToRgba(this.props.colour).g}
                                        onChange={(e) => {this.handleNumberInput(e.target.value, "rgb green")}}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]* '}}
                                    />
                                    <TextField
                                        label={"Blue"}
                                        className={"numberInput"}
                                        size={"small"}
                                        value={hsvaToRgba(this.props.colour).b}
                                        onChange={(e) => {this.handleNumberInput(e.target.value, "rgb blue")}}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]* '}}
                                    />
                                </div>
                                <div className={"details"}>
                                    <TextField
                                        label={"Hue"}
                                        className={"numberInput"}
                                        size={"small"}
                                        value={hsvaToHsla(this.props.colour).h}
                                        onChange={(e) => {this.handleNumberInput(e.target.value, "hsl hue")}}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]* '}}
                                    />
                                    <TextField
                                        label={"Saturation"}
                                        className={"numberInput"}
                                        size={"small"}
                                        value={Math.round(hsvaToHsla(this.props.colour).s)}
                                        onChange={(e) => {this.handleNumberInput(e.target.value, "hsl saturation")}}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]* '}}
                                    />
                                    <TextField
                                        label={"Lightness"}
                                        className={"numberInput"}
                                        size={"small"}
                                        value={Math.round(hsvaToHsla(this.props.colour).l)}
                                        onChange={(e) => {this.handleNumberInput(e.target.value, "hsl lightness")}}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]* '}}
                                    />
                                </div>
                                <div className={"hexCode"}>
                                    Hex Code: {hsvaToHex(this.props.colour)}
                                    <ContentCopyIcon style={{ color: "black", marginLeft: "10px"}} onClick={this.clipboard}/>
                                </div>
                            </div>
                        }
                        <div className={"complement"}>
                            {/* complement color block */}
                            <div className={"complement-color"} style={{background: hsvaToHex(this.calculateComplement())}}/>
                            
                            {/* complement swap  button */}
                            <div className={"swap"} onClick={this.swapToComplement}>
                                <SwapHorizIcon fontSize="large" style={{color: 'black'}}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Wheel
                            className={"wheel"}
                            color={this.getWheelColour()}
                            onChange={this.setWheelColour}
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
                <div className={"tabs"}>
                    <div 
                        className={"tab"}
                        style={{backgroundColor: this.tabColour(1)}} 
                        onClick={() => {this.switchTabs(1)}}
                    >
                        <div className={"tabText"}>
                            Mode 1
                        </div>
                    </div>
                    <div 
                        className={"tab"}
                        style={{backgroundColor: this.tabColour(2)}}
                        onClick={() => {this.switchTabs(2)}}
                    >
                        <div className={"tabText"}>
                            Mode 2
                        </div>
                    </div>
                </div>
            </div>
        )
}  
}  
