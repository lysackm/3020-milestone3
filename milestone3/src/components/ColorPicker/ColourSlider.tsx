import { Slider } from "@mui/material"
import { HsvaColor, RgbaColor } from "@uiw/react-color"
import React from "react"
import "./ColorPicker.css"

interface props {
    colour: HsvaColor
    colourName: string
    updateColour: (value: number, sliderColour: string) => void
    max: number
}

interface state {
    value: number
}

interface state {}

export class ColourSlider extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            value: this.getValue(this.props.colour)
        }  
    }

    // used to update state if colour changes
    componentDidUpdate(prevProps: props) {
        if(this.getValue(prevProps.colour) !== this.getValue(this.props.colour)){
            this.setState({value: this.getValue(this.props.colour)})
        }
    }

    getValue = (colour: HsvaColor) => {
        if(this.props.colourName === 'h'){
            return colour.h
        }else if(this.props.colourName === 's'){
            return colour.s
        }else { // b
            return colour.v
        }
    }

    getLabel = () => {
        if(this.props.colourName === 'h'){
            return "hue"
        }else if(this.props.colourName === 's'){
            return "saturation"
        }else { // b
            return "brightness"
        }
    }

    adjustSlider = (event: Event, value: number | Array<number>) => {
        if(value instanceof Array)
            return

        this.props.updateColour(value, this.props.colourName)

        this.setState({value: this.getValue(this.props.colour)})
    }

    render() {
        return (
            <div style={{display: "flex"}}>
                <div className={"label"}>
                   {this.getLabel()}
                </div>
                <Slider
                    className={"slider"}
                    max={this.props.max}
                    value={this.state.value}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    onChange={(event, value) => {return this.adjustSlider(event, value)}}
                />
            </div>
        )
    }
}