// if you need to add libraries add it like this
// most libraries are kept in node_modules
// to add libraries you need to add it to the package.json and then recompile the project
import React from "react";
import "./Properties.css"
import {HsvaColor, RgbaColor, hsvaToHex, rgbaToHex} from "@uiw/color-convert";
import paintBrush from '../../assets/PaintBrush.png';


interface props {
    colour: HsvaColor
}

// this is the state that you need inside of this component ONLY
interface state {
    color: RgbaColor
}


export class PaintBrush extends React.Component<props, state> {
    // I am a constructor. You have to always call super(props)
    // You also have to initalize the state here
    // You can do other stuff here too
    constructor(props: props) {
        super(props)
        this.state = {
            color: { r: 255, g: 255, b: 255, a: 1}
        }
    }

    // I am a function
    // you can put code in me and I will run when you call me in an 
    // typescript code block in the render block
    updateColor = () => {
        
        // console.log() is javascript version of print statements
        // to see the console logs, go to a webpage, right click, click inspect element (or F12) to open dev tools
        // then you can go to the console tab to see what is printed out
        console.log("I am printing something sudo random ")
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
                {
                    // div is a division. Think of this as a box that holds stuff
                    <div className={"BrushContainer"} > 
                        {/* onClick is a default thing, when you click this button, call the function */}
                        {/* Hey this is using a string object as text, this is very useful! */}
                        {/* <div onClick={this.prt}> print 0-4 </div> */}
                        <img src ={paintBrush} alt="paint brush" width= "90%" height ="200%"/>
                        <div   
                            className={"BrushTip"} 
                            style={{backgroundColor: rgbaToHex(this.state.color)}}
                                
                        />
                    </div>
                }
            </>
        )
    }
}