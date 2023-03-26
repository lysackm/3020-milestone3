// if you need to add libraries add it like this
// most libraries are kept in node_modules
// to add libraries you need to add it to the package.json and then recompile the project
import React from "react";
import "./Properties.css"
import {HsvaColor, RgbaColor, hsvaToHex} from "@uiw/color-convert";
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
   
    // render is a special function that returns html
    render() {
        return (
            <>
                {/* This is a typescript code block inside of html code */}
                {
                    // div is a division. Think of this as a box that holds stuff
                    <div className={"BrushContainer"} > 
                        
                        <img 
                            className="paintBrushImg"
                            src ={paintBrush} 
                            alt="paint brush" 
                            width= "90%" height ="200%"
                            />
                        <div   
                            className={"BrushTip"} 
                            style={{backgroundColor: hsvaToHex(this.props.colour)}}
                                
                        />
                    </div>
                }
            </>
        )
    }
}