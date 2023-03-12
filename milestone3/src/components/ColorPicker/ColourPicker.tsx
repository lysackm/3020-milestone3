import React from "react";
import {HsvaColor} from "@uiw/color-convert";
import {hsvaToHex, Wheel} from "@uiw/react-color";
import "./ColorPicker.css"
import {Slider} from "@mui/material";

interface props {}

// this is the state that you need inside of this component ONLY
interface state {
    hsva: HsvaColor
}

export class ColorPicker extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            hsva: { h: 0, s: 0, v: 68, a: 1 }
        }
    }

    render() {
        return (
            <div className={"colorPicker"}>
                <div className={"block"} style={{background: hsvaToHex(this.state.hsva)}}/>
                <div className={"display"}>
                    <Slider
                        className={"slider"}
                        defaultValue={50}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                    />
                    <Slider
                        className={"slider"}
                        defaultValue={50}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                    />
                    <Slider
                        className={"slider"}
                        defaultValue={50}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                    />
                    <Slider
                        className={"slider"}
                        defaultValue={50}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                    />
                    <div className={"complement"}>
                        <div className={"complement-color"} style={{background: hsvaToHex(this.state.hsva)}}/>

                        <div className={"swap"}/>
                    </div>
                </div>
                <div>
                    <Wheel
                        className={"wheel"}
                        color={this.state.hsva}
                        onChange={(color) => { this.setState({hsva: color.hsva}) }}
                        width={200}
                        height={200}
                    />
                </div>
            </div>
        )
    }
}