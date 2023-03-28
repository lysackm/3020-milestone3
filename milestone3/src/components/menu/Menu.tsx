import React from "react";
import "./Menu.css"
import MenuIcon from '@mui/icons-material/Menu';
import { Alert, Drawer, Snackbar, Tab, Tabs } from "@mui/material";
import { HsvaColor } from "@uiw/react-color";
import { Image } from "../Homepage/Homepage"
import { PaletteHistory } from "./PaletteHistory";
import { ColourHistory } from "./ColourHistory";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { ImageHistory } from "./ImageHistory";
import CanvasDraw from "react-canvas-draw";

interface props {
    paletteHistory: HsvaColor[][],
    colourHistory: HsvaColor[],
    imageHistory: Image[],
    changeColour: (colour: HsvaColor) => void,
    loadPalette: (palette: HsvaColor[]) => void,
    loadImage: (image: Image) => void
}

interface state {
    openDrawer: boolean,
    tab: number,
    open: boolean,
    info: boolean
}


export class Menu extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            openDrawer: false,
            tab: 0,
            open: false,
            info: false
        }
    }

    openDrawer = () => {
        this.setState({openDrawer: true})
    }

    selectTab = (event: React.SyntheticEvent, index: number) => {
        this.setState({tab: index})
    }

    handleTooltipClose = () => {
        this.setState({open: false});
    };

    handleTooltipOpen = () => {
        this.setState({open: true})
    };

    close = () => {
        this.setState({info: false})
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
                                <ClickAwayListener onClickAway={this.handleTooltipClose}>
                                    <div className="save-button">
                                        <Tooltip
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={this.handleTooltipClose}
                                            open={this.state.open}
                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener
                                            title="Successfully exported"
                                        >
                                            <Button onClick={this.handleTooltipOpen} variant="contained">Export</Button>
                                        </Tooltip>
                                    </div>
                                </ClickAwayListener>
                            </div>
                        }
                        {this.state.tab === 1 &&
                            <div>
                                {/* Palette History component */}
                                <PaletteHistory paletteHistory={this.props.paletteHistory} loadPalette={this.props.loadPalette}/>
                                <ClickAwayListener onClickAway={this.handleTooltipClose}>
                                    <div className="save-button">
                                        <Tooltip
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={this.handleTooltipClose}
                                            open={this.state.open}
                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener
                                            title="Successfully exported"
                                        >
                                            <Button onClick={this.handleTooltipOpen} variant="contained">Export</Button>
                                        </Tooltip>
                                    </div>
                                </ClickAwayListener>
                            </div>
                        }
                        {this.state.tab === 2 &&
                            <div className="image-history-menu">
                                {/* Image History component */}
                                {this.props.imageHistory.map((image) => 
                                    <div className="image-menu" onClick={() => {this.props.loadImage(image); this.setState({info: true})}}>
                                        <CanvasDraw
                                        hideInterface={true}
                                        hideGrid={true}
                                        disabled
                                        imgSrc={image.link}
                                        saveData={image.painting}
                                        />
                                    </div>
                                )}
                                
                                <ClickAwayListener onClickAway={this.handleTooltipClose}>
                                    <div className="save-button">
                                        <Tooltip
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={this.handleTooltipClose}
                                            open={this.state.open}
                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener
                                            title="Successfully exported"
                                        >
                                            <Button onClick={this.handleTooltipOpen} variant="contained">Export</Button>
                                        </Tooltip>
                                    </div>
                                </ClickAwayListener>
                            </div>
                        }
                    </div>
                    <Snackbar 
                        open={this.state.info}
                        autoHideDuration={2000}
                        onClose={this.close}
                        >
                            <Alert severity="info" sx={{ width: '100%' }}>
                            Loaded
                            </Alert>
                        </Snackbar>
                </Drawer>
            </div>
        )
    }
}
