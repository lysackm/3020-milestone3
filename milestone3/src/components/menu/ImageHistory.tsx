import * as React from "react";
import "./Menu.css"
import { Image } from "../Homepage/Homepage"
import CanvasDraw from "react-canvas-draw";

interface props {
    imageHistory: Image[],
    loadImage: (image: Image) => void
}

interface state {}

export class ImageHistory extends React.Component<props, state> {
    private canvasRef: CanvasDraw | null;
    constructor(props: props) {
        super(props)
        this.state = {}
        this.canvasRef = null;
    }

    render() {
        return (
            <div className="scroll">
                <CanvasDraw
                ref={(canvasDraw: any) => (this.canvasRef = canvasDraw)}
                canvasWidth={100} 
                canvasHeight={50}
                hideGrid={true}
                />
                {/* {this.props.imageHistory.map((image) => 
                   <CanvasDraw
                        canvasWidth={100} 
                        canvasHeight={50}
                        hideGrid={true}
                        imgSrc={image.link}
                        hideInterface={true}
                    />
                )} */}
            </div>
        )
    }
}