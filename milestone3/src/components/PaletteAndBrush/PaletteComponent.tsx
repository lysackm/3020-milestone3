import React from "react";
import "./Properties.css"
import {HsvaColor, hsvaToHex, RgbaColor} from "@uiw/color-convert";
import {rgbaToHsva} from "@uiw/react-color";
import palette from '../../assets/palette.png';

// this is a props interface that is variables that are passed into the 
// component
// think of this as outside state
interface props {
    colour: HsvaColor
    colours: HsvaColor[]
}

// this is the state that you need inside of this component ONLY
interface state {
    colors: HsvaColor[]
}


export class Palette extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            colors: this.props.colours
        }
    }

    handleColorChange = (color: any) => {
        // Create a new copy of the colors array
        const newColors = [...this.state.colors];
        // Update the color at the specified index
        newColors[color] = this.props.colour;
        // Update the state with the new colors array
        this.setState({ colors: newColors });
    }
    

    onClick = (color: number) => (event: React.MouseEvent<HTMLDivElement>) =>{
        console.log("Change colour here")
        this.handleColorChange(color);
        const clickedElement = event.currentTarget;
        clickedElement.style.backgroundColor = hsvaToHex(this.state.colors[color]);
    }

    // functions are declared like this
    // funcName = () => {}
    
    // funcName is the function name
    // the equals is saying that its equal to the following () => {}

    // () is the parameters
    // => is a function defintion in typescript
    // {} is where the code goes

    // declare parameters like ( aParam: type)

    // render is a special function that returns html
    render() {
        return (
            <>
                {/* This is a typescript code block inside of html code */}
                {//this.props.showButton &&
                    // div is a division. Think of this as a box that holds stuff
                    <div>
                        {/* onClick is a default thing, when you click this button, call the function */}
                        {/* Hey this is using a string object as text, this is very useful! */}
                        {/* <button onClick={this.onClick}>{this.state.buttonText}</button> */}
                        <div className="container">
                            <img src ={palette} alt="art palette" width= "465%" height ="465%"/>

                            <div 
                                key = {0}
                                className={"colour1 circle"} 
                                style={{backgroundColor: hsvaToHex(this.props.colours[0])}}
                                onClick ={this.onClick(0)}
                            />

                            <div 
                                className={"circle colour2"} 
                                style={{backgroundColor: hsvaToHex(this.props.colours[1])}}
                                onClick ={this.onClick(1)}
                            />

                            <div 
                                className={"circle colour3"} 
                                style={{backgroundColor: hsvaToHex(this.props.colours[2])}}
                                onClick ={this.onClick(2)}
                            />

                            <div 
                                className={"circle colour4"} 
                                style={{backgroundColor: hsvaToHex(this.props.colours[3])}}
                                onClick ={this.onClick(3)}
                           />

                            <div 
                                className={"circle colour5"} 
                                style={{backgroundColor: hsvaToHex(this.props.colours[4])}}
                                onClick ={this.onClick(4)}
                            />

                            <div 
                                className={"circle colour6"} 
                                style={{backgroundColor: hsvaToHex(this.props.colours[5])}}
                                onClick ={this.onClick(5)}
                            />
                        </div>
                        
                    </div>
                }
            </>
        )
    }
}