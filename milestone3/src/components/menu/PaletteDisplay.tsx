import { HsvaColor } from "@uiw/react-color";
import React from "react";
import "./Menu.css"
import { Colour } from "./Colour";


interface props {
    palette: HsvaColor[]
    loadPalette: (pallete: HsvaColor[]) => void
}

interface state {}

export class PaletteDisplay extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="palette-display" onClick={() => {this.props.loadPalette(this.props.palette)}}>
                {this.props.palette.map((colour) => 
                    <Colour colour={colour}/>
                )}
            </div>
            
        )
    }
}