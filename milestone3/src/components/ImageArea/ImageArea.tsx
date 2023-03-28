import React from 'react';
import './ImageArea.css';
import CanvasDraw from "react-canvas-draw";
import { HsvaColor, hsvaToHex } from '@uiw/react-color';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { Image } from '../Homepage/Homepage'
import { Alert, Snackbar } from '@mui/material';

interface Props {
  activeColour: HsvaColor,
  image: Image,
  addImage: (image: Image) => void,
  changeImage: (image: Image, doodles: string) => void
}

interface State {
  lastSave: string | undefined,
  open: boolean
}

export class ImageArea extends React.Component<Props, State> {
  private canvasRef: CanvasDraw | null;
  constructor(props: Props) {
    super(props);

    this.state = {
      lastSave: '',
      open: false
    };

    this.canvasRef = null;
  }

  clear = () => {
    this.canvasRef?.clear()
  }

  undo = () => {
    this.canvasRef?.undo()
    console.log(this.props.image.painting)
  }

  save = () => {
    this.setState({lastSave: this.canvasRef?.getSaveData()})
    if(this.canvasRef?.getSaveData()){
      this.props.changeImage(this.props.image, this.canvasRef?.getSaveData())
      this.props.addImage(this.props.image)
    }
    this.setState({open: true})
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
          canvasWidth={600} 
          canvasHeight={300}
          hideGrid={true}
          imgSrc={this.props.image.link}
          brushColor={hsvaToHex(this.props.activeColour)}
          saveData={this.props.image.painting}
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
        <Snackbar 
          open={this.state.open}
          autoHideDuration={2000}
          onClose={() => {this.setState({open: false})}}
        >
            <Alert severity="success" sx={{ width: '100%' }}>
              Saved!
            </Alert>
        </Snackbar>
      </div>
    );
  }
}
