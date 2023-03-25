import React from "react";
import "./Properties.css"
import {HsvaColor, hsvaToHex} from "@uiw/color-convert";
import palette from '../../assets/palette.png';

// this is a props interface that is variables that are passed into the 
// component
// think of this as outside state
interface props {
    colour: HsvaColor
    colours: HsvaColor[]
    changeColour: (colour: HsvaColor) => void
}

// this is the state that you need inside of this component ONLY
interface state {
}


export class Palette extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
        }
    }

    // handleColorChange = (color: any) => {
    //         this.setState({ colour: color.hex });
    // }
    

    onClick = (color: number) => (event: React.MouseEvent<HTMLDivElement>) =>{
        console.log("Change colour here")
        // //get array val and change
        // Create a new copy of the colors array
        const newColors = [...this.props.colours];
        // Update the color at the specified index
        // newColors[color] = this.props.colour;
        // Update the state with the new colors array
        this.setState({ colors: newColors });

        const clickedElement = event.currentTarget;
        clickedElement.style.backgroundColor = hsvaToHex(this.props.colours[color]);
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

                            <div className={"circle colour2"} style={{backgroundColor: hsvaToHex(this.props.colours[1])}}/>
                            <div className={"circle colour3"} style={{backgroundColor: hsvaToHex(this.props.colours[2])}}/>
                            <div className={"circle colour4"} style={{backgroundColor: hsvaToHex(this.props.colours[3])}}/>
                            <div className={"circle colour5"} style={{backgroundColor: hsvaToHex(this.props.colours[4])}}/>
                            <div className={"circle colour6"} style={{backgroundColor: hsvaToHex(this.props.colours[5])}}/>
                        </div>
                        
                    </div>
                }
            </>
        )
    }
}