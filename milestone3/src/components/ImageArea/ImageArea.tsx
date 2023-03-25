import React, { Component } from 'react';
import { RgbaColor, rgbaToHex } from '@uiw/color-convert';
import './ImageArea.css';
import logo from '../../assets/image.jpg';
import paper from 'paper';
import { Path, Tool, Color } from 'paper';

interface Props {}

interface State {
  color: RgbaColor,
  mouseDown: boolean
}

export class ImageArea extends Component<Props, State> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private path: paper.Path | null;
  private tool: paper.Tool;

  constructor(props: Props) {
    super(props);

    this.state = {
      color: { r: 0, g: 0, b: 0, a: 0 },
      mouseDown: false
    };

    this.canvasRef = React.createRef<HTMLCanvasElement>();
    this.path = null;
    this.tool = new paper.Tool();

    this.tool.onMouseDown  = (event: any) => {
      console.log("down")
      this.setState({mouseDown: true})
      const colour: paper.Color = new paper.Color(rgbaToHex(this.state.color))
  
      this.path = new paper.Path({
        segments: [event.point],
        strokeColor: colour,
        strokeWidth: 40,
        strokeCap: 'round',
        strokeJoin: 'round',
      });
    }
  }

  // Load Image
  componentDidMount() {
    const canvas = this.canvasRef.current!;
    paper.setup(canvas);

    const raster = new paper.Raster(logo);
    raster.onLoad = () => {
      raster.position = paper.view.center;
    };

  }

  onMouseDown = (event: any) => {
    console.log("down")
    this.setState({mouseDown: true})
    const colour: paper.Color = new paper.Color(rgbaToHex(this.state.color))

    this.path = new paper.Path({
      segments: [event.point],
      strokeColor: colour,
      strokeWidth: 40,
      strokeCap: 'round',
      strokeJoin: 'round',
    });
  }

  onMouseDrag = (event: any) => {
    if(this.state.mouseDown){
      if (this.path) {
        console.log("drag")
        this.path.add(event.point);
      }
    }
  }

  onMouseUp = () => {
    console.log("up")
    this.setState({mouseDown: false})
  }

  setColor(color: RgbaColor) {
    this.setState({ color });
  }

  render() {
    return (
      <div className="displayArea">
        <canvas id="canvas" ref={this.canvasRef} onMouseMove={this.onMouseDrag} onMouseUp={this.onMouseUp}>
          <div id="displayArea">

          </div>
        </canvas>
        <div className="color-picker">
          <div
            className="color-swatch"
            style={{ backgroundColor: `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b},${this.state.color.a})` }}
          />
          {/* <input
            type="color"
            value={`#${this.state.color.r.toString(16).padStart(2, '0')}${this.state.color.g.toString(16).padStart(2, '0')}${this.state.color.b.toString(16).padStart(2, '0')}${this.state.color.a.toString(16).padStart(2, '0')}`}
            onChange={(e) => this.setColor(Color.parse(e.target.value))}
          /> */}
        </div>
      </div>
    );
  }
}
