import { Slider } from "@mui/material"
import { RgbaColor } from "@uiw/react-color"
import React from "react"
import "./ColorPicker.css"

interface props {
    colour: RgbaColor
    colourName: string
    updateColour: (value: number, sliderColour: string) => void
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

    getValue = (colour: RgbaColor) => {
        if(this.props.colourName === 'r'){
            return colour.r
        }else if(this.props.colourName === 'g'){
            return colour.g
        }else { // b
            return colour.b
        }
    }

    adjustSlider = (event: Event, value: number | Array<number>) => {
        if(value instanceof Array<number>)
            return

        this.props.updateColour(value, this.props.colourName)

        this.setState({value: this.getValue(this.props.colour)})
    }

    render() {
        return (
            <div style={{display: "flex"}}>
                <div className={"label"}>
                   {this.props.colourName}
                </div>
                <Slider
                    className={"slider"}
                    max={255}
                    value={this.state.value}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    onChange={(event, value) => {return this.adjustSlider(event, value)}}
                />
            </div>
        )
    }
}