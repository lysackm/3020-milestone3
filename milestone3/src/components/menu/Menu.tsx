import React from "react";
import "./Menu.css"
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Tab, Tabs } from "@mui/material";
import { HsvaColor } from "@uiw/react-color";
import { Image } from "../Homepage/Homepage"
import { PaletteHistory } from "./PaletteHistory";
import { ColourHistory } from "./ColourHistory";

interface props {
    paletteHistory: HsvaColor[][],
    colourHistory: HsvaColor[],
    imageHistory: Image[],
    changeColour: (colour: HsvaColor) => void,
    loadPalette: (palette: HsvaColor[]) => void,
}

interface state {
    openDrawer: boolean,
    tab: number
}


export class Menu extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            openDrawer: false,
            tab: 0
        }
    }

    openDrawer = () => {
        this.setState({openDrawer: true})
    }

    selectTab = (event: React.SyntheticEvent, index: number) => {
        this.setState({tab: index})
    }

    render() {
        return (
            <div>
                <div className="menuButton">
                    <MenuIcon 
                        style={{ color: "black" }} 
                        fontSize="large"
                        onClick={this.openDrawer}
                    />
                </div>
                <Drawer
                    anchor="left"
                    open={this.state.openDrawer}
                    onClose={() => {this.setState({openDrawer: false})}}
                >
                    <div className="menu">
                        <Tabs 
                            value={this.state.tab} 
                            onChange={this.selectTab}
                            variant="fullWidth"
                            textColor="inherit"
                            indicatorColor="secondary"
                        >
                            <Tab 
                                label="Colour History"
                                style={{fontWeight: 700}}
                            />
                            <Tab 
                                label="Palette History"
                                style={{fontWeight: 700}}
                            />
                            <Tab 
                                label="Image History"
                                style={{fontWeight: 700}}
                            />
                        </Tabs>
                        {this.state.tab === 0 &&
                            <div>
                                {/* Colour History component */}
                                <ColourHistory colourHistory={this.props.colourHistory} changeColour={this.props.changeColour}/>
                            </div>
                        }
                        {this.state.tab === 1 &&
                            <div>
                                {/* Palette History component */}
                                <PaletteHistory paletteHistory={this.props.paletteHistory} loadPalette={this.props.loadPalette}/>
                            </div>
                        }
                        {this.state.tab === 2 &&
                            <div>
                                {/* Image History component */}
                            </div>
                        }
                    </div>
                </Drawer>
            </div>
        )
    }
}
