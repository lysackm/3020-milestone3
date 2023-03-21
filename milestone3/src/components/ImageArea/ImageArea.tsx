import React from 'react';
import {RgbaColor} from "@uiw/color-convert";
import Konva from "konva";
import {Stage, Layer, Image, Line} from 'react-konva';
import "./ImageArea.css";

interface props {}

interface state {
  isDrawing: boolean,
  colour: RgbaColor
  lines: Array<any>
}

export class ImageArea extends React.Component<props, state> {
  private imageRef: any;
  private layerRef: any;
  private lineRef: any;

  constructor (props: props) {
    super(props)
    this.state = {
      isDrawing: false,
      colour: {r:0, g:0, b:0, a:1},
      lines: []
    }

    this.imageRef = React.createRef;
    this.layerRef = React.createRef;
    this.lineRef = React.createRef;
  }

  //Load image
  componentDidMount() {
    const image = new window.Image();
    image.src = 'assets/image.jpg';
    image.onload = () => {
      this.imageRef.current.getLayer().batchDraw();
    }
  }

  //Drawing Functions
  handleMouseDown = () => {
    this.setState({
      isDrawing: true
    });

    const stage = this.layerRef.current.getStage();
    const point = stage.getPointerPosition();
    const newLine = {
      stroke: 'rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})',
      strokeWidth: 5,
      points: [point.x, point.y]
    };

    this.setState({
      lines: [...this.state.lines, newLine]
    });
  }

  handleMouseMove = () => {
    if(!this.state.isDrawing) {
      return
    } 
    else {
      const stage = this.layerRef.current.getStage();
      const point = stage.getPointerPosition();
      let {lines} = this.state;
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      lines.splice(lines.length-1, 1, lastLine);
      this.setState({
        lines: lines
      });
    }
  }

  handleMouseUp = () => {
    
  }
}
