import React from "react";
import {HsvaColor} from "@uiw/color-convert";
import {hsvaToHex, Wheel} from "@uiw/react-color";

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
            <>
                <div style={{background: hsvaToHex(this.state.hsva)}}>
                    <Wheel
                        color={this.state.hsva}
                        onChange={(color) => { this.setState({hsva: color.hsva}) }}
                        width={500}
                        height={500}
                    />
                </div>
            </>
        )
    }
}