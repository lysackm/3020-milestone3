import { HsvaColor } from "@uiw/react-color";
import React from "react";
import "./Menu.css"
import { PaletteDisplay } from "./PaletteDisplay";


interface props {
    paletteHistory: HsvaColor[][],
    loadPalette: (palette: HsvaColor[]) => void
}

interface state {}

export class PaletteHistory extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="palette-history scroll">
                {this.props.paletteHistory.map((palette) => 
                    <PaletteDisplay 
                        palette={palette} 
                        loadPalette={this.props.loadPalette}
                    />
                )}
            </div>
        )
    }
}