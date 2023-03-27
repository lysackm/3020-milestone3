import React from 'react';
import './ImageArea.css';
import CanvasDraw from "react-canvas-draw";
import { HsvaColor, hsvaToHex } from '@uiw/react-color';
import { Button } from '@mui/material';

interface Props {
  activeColour: HsvaColor
}

interface State {
  lastSave: string | undefined
}

export class ImageArea extends React.Component<Props, State> {
  private canvasRef: CanvasDraw | null;
  constructor(props: Props) {
    super(props);

    this.state = {
      lastSave: ''
    };

    this.canvasRef = null;
  }

  clear = () => {
    this.canvasRef?.clear()
  }

  undo = () => {
    this.canvasRef?.undo()
  }

  save = () => {
    this.setState({lastSave: this.canvasRef?.getSaveData()})
  }

  load = () => {
    if(this.state.lastSave){
      this.canvasRef?.loadSaveData(this.state.lastSave)
    }
  }


  render() {
    return (
      <div className='canvas'>
        <Button onClick={this.save}>
          save
        </Button>
        <Button onClick={this.load}>
          load
        </Button>
        <Button onClick={this.clear}>
          clear
        </Button>
        <CanvasDraw
          ref={canvasDraw => (this.canvasRef = canvasDraw)}
          canvasWidth={800} 
          canvasHeight={400}
          hideGrid={true}
          imgSrc='https://upload.wikimedia.org/wikipedia/commons/2/22/Sunset_may_2006_panorama.jpg'
          brushColor={hsvaToHex(this.props.activeColour)}
        />
      </div>
    );
  }
}
