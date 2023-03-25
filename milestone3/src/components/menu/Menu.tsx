import React from "react";
import "./Menu.css"
import MenuIcon from '@mui/icons-material/Menu';

interface props {
}

interface state {
}


export class Menu extends React.Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div className="menuButton">
                    <MenuIcon style={{ color: "black" }} fontSize="large"/>
                </div>
            </div>
        )
    }
}