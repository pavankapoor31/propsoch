import React, { useState } from "react";
import { Box, MobileStepper, Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const ImageSlider = ({ images }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [startTouch, setStartTouch] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % images.length);
  };

  const handleBack = () => {
    setActiveStep((prevStep) =>
      prevStep === 0 ? images.length - 1 : prevStep - 1
    );
  };

  // Handle direct dot click
  const handleDotClick = (index) => {
    setActiveStep(index);
  };

  // Handle touch start
  const handleTouchStart = (e) => {
    setStartTouch(e.touches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!startTouch) return;
    const currentTouch = e.touches[0].clientX;
    const swipeDirection = startTouch - currentTouch;

    if (swipeDirection > 50) {
      handleNext();
      setStartTouch(0); // Reset after swipe
    } else if (swipeDirection < -50) {
      handleBack();
      setStartTouch(0); // Reset after swipe
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setStartTouch(0); // Reset on touch end
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image */}
      <Box
        component="img"
        src={images[activeStep]}
        alt={`Slide ${activeStep}`}
        sx={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          borderRadius: 2,
        }}
      />

      <Box
        position="absolute"
        bottom={0}
        left="auto"
        right="auto"
        zIndex={2}
      >
        <MobileStepper
          variant="dots"
          steps={images.length}
          position="static"
          color="white"
          sx={{
            backgroundColor: 'transparent',
            '& .MuiMobileStepper-dot': {
              cursor: 'pointer',
              mx: 0.5,
            },
            '& .MuiMobileStepper-dots': {
              gap: '2px',
            },
            '.MuiMobileStepper-dotActive':{
              background: 'white',
            }
          }}
          activeStep={activeStep}
          onClick={(e) => {
            const dots = [...e.currentTarget.getElementsByClassName('MuiMobileStepper-dot')];
            const clickedDotIndex = dots.indexOf(e.target);
            if (clickedDotIndex !== -1) {
              handleDotClick(clickedDotIndex);
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default ImageSlider;
