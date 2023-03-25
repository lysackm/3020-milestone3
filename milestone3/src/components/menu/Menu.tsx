import React from "react";
import "./Menu.css"
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Tab, Tabs } from "@mui/material";

interface props {
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
                        <Tabs value={this.state.tab} onChange={this.selectTab}>
                            <Tab label="Colour History"/>
                            <Tab label="Palette History"/>
                            <Tab label="Image History"/>
                        </Tabs>
                        {this.state.tab === 0 &&
                            <div>
                                {/* Colour History component */}
                            </div>
                        }
                        {this.state.tab === 1 &&
                            <div>
                                {/* Colour History component */}
                            </div>
                        }
                        {this.state.tab === 2 &&
                            <div>
                                {/* Colour History component */}
                            </div>
                        }
                    </div>
                </Drawer>
            </div>
        )
    }
}