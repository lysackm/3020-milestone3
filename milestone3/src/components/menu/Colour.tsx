import { HsvaColor, hsvaToHex } from "@uiw/react-color";
import React from "react";
import "./Menu.css"


interface props {
    colour: HsvaColor,
    selectable?: boolean,
    changeColour?: (colour: HsvaColor) => void
}

interface state {}

export class Colour extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {}
    }

    changeColour = () => {
        if(this.props.selectable && this.props.changeColour){
            this.props.changeColour(this.props.colour)
        }
    }

    render() {
        return (
            <div 
                className={this.props.selectable ? "selectable-colour-box colour-box" : "colour-box"}
                style={{backgroundColor: hsvaToHex(this.props.colour)}}
                onClick={this.changeColour}
            />
        )
    }
}