import { HsvaColor, hexToHsva } from "@uiw/react-color";
import React from "react";
import { ColourPicker } from "../ColorPicker/ColourPicker";
import "./Homepage.css"
import { Menu } from "../menu/Menu";
import { Palette } from "../PaletteAndBrush/PaletteComponent";
import { PaintBrush } from "../PaletteAndBrush/paintBrush";
import { ImageArea } from "../ImageArea/ImageArea";
import { InfoButton } from "../infoButton/Button";


export interface Image {
    link: string,
    painting: string
}

interface state {
    activeColour: HsvaColor,
    activeColourPosition: number, 
    palette: HsvaColor[],
    paletteHistory: HsvaColor[][],
    colorHistory: HsvaColor[],
    imageHistory: Image[],
    changed: boolean,
    activeImage: Image
}

interface props {

}

const images: Image[] = [
    {link: "https://upload.wikimedia.org/wikipedia/commons/2/22/Sunset_may_2006_panorama.jpg", painting: '{"lines":[],"width":600,"height":300}'},
    {link: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Delicatearch.png", painting: '{"lines":[],"width":600,"height":300}'},
    {link: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Hepatica_nobilis_flowers_-_blue_and_pink_-_Keila.jpg", painting: '{"lines":[],"width":600,"height":300}'},
    {link: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Manhattan_Beach_Sunset.jpg", painting: '{"lines":[],"width":600,"height":300}'},
    {link: "https://upload.wikimedia.org/wikipedia/commons/9/90/Sunset_Marina.JPG", painting: '{"lines":[],"width":600,"height":300}'},
    {link: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Autumn_Colours_-_Stourhead_-_geograph.org.uk_-_1044997.jpg", painting: '{"lines":[],"width":600,"height":300}'}
    ]

// const images: Image[] = [{link: "https://upload.wikimedia.org/wikipedia/commons/2/22/Sunset_may_2006_panorama.jpg", painting: '{"lines":[],"width":600,"height":300}'}]

export class Homepage extends React.Component<props, state> {
    constructor(props: props) {
        super(props)

        this.state = {
            activeColour: hexToHsva("#ff7094"),
            activeColourPosition: 0,
            palette: [hexToHsva("#ff7094"), hexToHsva("#70ffdb"), hexToHsva("#0aab3d"), hexToHsva("#ab223e"), hexToHsva("#a735ab"), hexToHsva("#1547ab")],
            paletteHistory: [],
            colorHistory: [],
            imageHistory: images,
            changed: true,
            activeImage: images[0]
        }
    }

    changeActiveColour = (colour: HsvaColor) => {
        this.setState({activeColour: colour}, () => {
            this.checkColour(colour)
        })

    }

    addImage = (image: Image) => {
        let newImageHistory = this.state.imageHistory
        let newImage = {...image}
        newImageHistory.unshift(newImage)
        this.setState({imageHistory: newImageHistory})
    }

    changeImage = (image: Image, doodles: string) => {
        image.painting = doodles
    }

    loadImage = (image: Image) => {
        let newImage = {...image}
        this.setState({activeImage: newImage})
    }

    getCopy = (image: Image) => {
        return {...image}
    }

    addColour = (colour: HsvaColor) => {
        let newColourHistory = this.state.colorHistory
        newColourHistory.unshift(colour)
        this.setState({colorHistory: newColourHistory})
    }

    addPalette = (palette: HsvaColor[]) => {
        const newPalette: HsvaColor[] = []

        palette.forEach(colour => newPalette.push(colour))

        let newPaletteHistory = this.state.paletteHistory
        newPaletteHistory.unshift(newPalette)
        this.setState({paletteHistory: newPaletteHistory})
    }
    
    loadPalette = (palette: HsvaColor[]) => {
        this.setState({palette: palette})
        this.setState({activeColour: palette[0]})
    }

    loadColour = (colour: HsvaColor) => {
        this.setState({changed: true})
    }

    checkColour = (colour: HsvaColor) => {
        let colourExists = false;
        let oldColour: HsvaColor = this.state.activeColour
        this.setState({activeColour: colour})

        for(let i = 0; i < this.state.palette.length && !colourExists; i++){
            if(this.cmpHsva(this.state.palette[i], colour)){
                console.log(i, this.state.palette, "i")
                this.setState({activeColourPosition: i})
                colourExists = true;
            }
        }
        
        if(!colourExists){
            console.log("not exists")
            this.replacePaletteColour(colour)
        }else{
            if(this.state.changed){
                this.setState({changed: false})
                this.addColour(oldColour)
                this.addPalette(this.state.palette)
            }
        }
    }

    replacePaletteColour = (newColour: HsvaColor) => {
        let pos = this.state.activeColourPosition;
        let newPalette = this.state.palette

        newPalette[pos] = {...newColour}

        this.setState({palette: newPalette})
        this.setState({changed: true})
    }

    cmpHsva = (c1: HsvaColor, c2: HsvaColor) => {
        if(c1.h === c2.h && c1.a === c2.a && c1.s === c2.s && c1.v === c2.v){
            return true;
        }
        return false
    }


    // render is a special function that returns html
    render() {
        return (
            <div>
                <InfoButton></InfoButton>
                <div className="flex">
                    {/* menu and header style={{background: hsvaToHex(this.state.activeColour)}}*/}
                    <Menu
                        paletteHistory={this.state.paletteHistory}
                        colourHistory={this.state.colorHistory}
                        imageHistory={this.state.imageHistory}
                        changeColour={this.checkColour}
                        loadPalette={this.loadPalette}
                        loadImage={this.loadImage}
                    />
                    
                </div>
                <div className="flex">
                    {/* Image and palette area */}
                    <ImageArea 
                        activeColour={this.state.activeColour}
                        image={this.getCopy(this.state.activeImage)}
                        addImage={this.addImage}
                        changeImage={this.changeImage}
                    />
                    <Palette
                        colour={this.state.activeColour}
                        colours={this.state.palette}
                        changeColour={this.changeActiveColour}
                    />
                </div>
                <div className="flex colour-picker-homepage">
                    {/* ColourPicker and paintbrush */}
                    <ColourPicker changeColour={this.changeActiveColour} colour={this.state.activeColour}></ColourPicker>
                    <PaintBrush colour={this.state.activeColour}></PaintBrush>
                </div>
            </div>
        )
    }
}