import { HsvaColor } from "@uiw/react-color";
import React from "react";
import "./Menu.css"
import { Colour } from "./Colour";


interface props {
    colourHistory: HsvaColor[],
    changeColour: (colour: HsvaColor) => void
}

interface state {}

export class ColourHistory extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="colour-history">
                {this.props.colourHistory.map((colour) => 
                    <Colour colour={colour} selectable={true} changeColour={this.props.changeColour}/>
                )}
            </div>
        )
    }
}