import { useState, useReducer } from 'react';
import colorService from "./services/colorService";

import Swatches from "./components/Swatches";
import HSLForm from "./components/HSLForm";
import useColorState from "./hooks/colorState";

function App() {
  const {
    colorState,
    handleGetColors,
    handleSaturationChange,
    handleLightChange,
    validateInputs
  } = useColorState();

  return (
    <>
      <HSLForm 
        colorState={colorState}
        handleGetColors={handleGetColors}
        handleSaturationChange={handleSaturationChange}
        handleLightChange={handleLightChange}
        validateInputs={validateInputs}
      />

      <Swatches colorState={colorState} />
    </>
  )
}

export default App
