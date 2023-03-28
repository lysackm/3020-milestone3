import React, { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import "./Button.css"
import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

export const InfoButton = () => {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 300,
      fontSize: "18px",
      border: '1px solid #dadde9',
    },
  }));

  
  return (
    <div className="left">
        <HtmlTooltip title={<p>Use the palette to select your colour, then paint your colour onto the canvas. Use the colour picker in the bottom
            left to display the 
        </p>}>
        <InfoIcon 
            style={{ color: "lightgray", margin: "10px", right: "0px", top: "0px", position: "absolute"}} 
            fontSize="large"
            onClick={handleClick}
        />

        
          
        </HtmlTooltip>
    </div>
  );
};