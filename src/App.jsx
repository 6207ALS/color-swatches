import { useState, useReducer } from 'react';
import colorService from "./services/colorService";

import Swatch from "./components/Swatch";
import Swatches from "./components/Swatches";
import HSLForm from "./components/HSLForm";
import useColorState from "./hooks/colorState";

function App() {
	const {
		colorState,
    handleGetColors,
    handleSaturationChange,
    handleLightChange,
	} = useColorState();

  return (
    <>
      <HSLForm 
				handleGetColors={handleGetColors}
				handleSaturationChange={handleSaturationChange}
				handleLightChange={handleLightChange}
			/>

			<Swatches colorState={colorState} />
    </>
  )
}

export default App
