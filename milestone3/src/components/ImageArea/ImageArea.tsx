import React, { Component } from 'react';
import { RgbaColor, hsvaToHex, rgbaToHex } from '@uiw/color-convert';
import './ImageArea.css';
import logo from '../../assets/image.jpg';
import paper from 'paper';
import { Path, Tool, Color } from 'paper';

interface Props {}

interface State {
  color: RgbaColor;
}

export class ImageArea extends Component<Props, State> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private path: paper.Path | null;
  private tool: paper.Tool;

  constructor(props: Props) {
    super(props);

    this.state = {
      color: { r: 0, g: 0, b: 0, a: 0 },
    };

    this.canvasRef = React.createRef<HTMLCanvasElement>();
    this.path = null;
    this.tool = new paper.Tool();
  }

  // Load Image
  componentDidMount() {
    const canvas = this.canvasRef.current!;
    paper.setup(canvas);

    const raster = new paper.Raster(logo);
    raster.onLoad = () => {
      raster.position = paper.view.center;
    };

    let colour: paper.Color = new paper.Color(rgbaToHex(this.state.color))

    // Drawing Functions
    this.tool.onMouseDown = (event: paper.MouseEvent) => {
      console.log("here")
      this.path = new paper.Path({
        segments: [event.point],
        strokeColor: colour,
        strokeWidth: 4,
        strokeCap: 'round',
        strokeJoin: 'round',
      });
    };

    this.tool.onMouseDrag = (event: paper.MouseEvent) => {
      console.log("here")
      if (this.path) {
        this.path.add(event.point);
      }
    };
  }

  setColor(color: RgbaColor) {
    this.setState({ color });
  }

  render() {
    return (
      <div className="ImageArea">
        <canvas ref={this.canvasRef} />
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
