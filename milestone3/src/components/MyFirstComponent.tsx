// if you need to add libraries add it like this
// most libraries are kept in node_modules
// to add libraries you need to add it to the package.json and then recompile the project
import React from "react";

// this is a props interface that is variables that are passed into the 
// component
// think of this as outside state
interface props {
    showButton: boolean
}

// this is the state that you need inside of this component ONLY
interface state {
    buttonText: string
}


export class MyFirstComponent extends React.Component<props, state> {
    // I am a constructor. You have to always call super(props)
    // You also have to initalize the state here
    // You can do other stuff here too
    constructor(props: props) {
        super(props)
        this.state = {
            buttonText: "Im a button"
        }
    }

    // I am a function
    // you can put code in me and I will run when you call me in an 
    // typescript code block in the render block
    onClick = () => {
        this.setState({buttonText: "I have been pressed!"})
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
                {this.props.showButton &&
                    // div is a division. Think of this as a box that holds stuff
                    <div>
                        {/* onClick is a default thing, when you click this button, call the function */}
                        {/* Hey this is using a string object as text, this is very useful! */}
                        <button onClick={this.onClick}>{this.state.buttonText}</button>
                        <p>This is a paragraph html tag</p>
                    </div>
                }
            </>
        )
    }
}