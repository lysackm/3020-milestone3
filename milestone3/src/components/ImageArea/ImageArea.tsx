import React from 'react';
import './ImageArea.css';
import CanvasDraw from "react-canvas-draw";
import { HsvaColor, hsvaToHex } from '@uiw/react-color';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

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
        <CanvasDraw
          ref={(canvasDraw: any) => (this.canvasRef = canvasDraw)}
          canvasWidth={800} 
          canvasHeight={400}
          hideGrid={true}
          imgSrc='https://upload.wikimedia.org/wikipedia/commons/2/22/Sunset_may_2006_panorama.jpg'
          brushColor={hsvaToHex(this.props.activeColour)}
        />
        <div className="buttons">
          <div className="canvas-button" onClick={this.save}>
            <Tooltip disableFocusListener disableTouchListener title="Save">
              <SaveIcon className="canvas-icon"/>
            </Tooltip>
          </div>
          <div className="canvas-button" onClick={this.undo}>
            <Tooltip disableFocusListener disableTouchListener title="Undo">
              <UndoIcon className="canvas-icon"/>
            </Tooltip>
          </div>
          <div className="canvas-button" onClick={this.clear}>
            <Tooltip disableFocusListener disableTouchListener title="Clear">
              <DeleteIcon className="canvas-icon"/>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
