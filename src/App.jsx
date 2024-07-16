import { useState, useReducer } from 'react';
import colorService from "./services/colorService";

import Swatch from "./components/Swatch";
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
      <form onSubmit={handleGetColors}>
				<label htmlFor="saturation_input">Saturation: </label>
				<input 
					id="saturation_input" 
					type="text"
					onChange={handleSaturationChange}
				/>

				<label htmlFor="light_input">Light:</label>
				<input 
					id="light_input" 
					type="text"
					onChange={handleLightChange}
				/>

				<button type="submit">Search</button>
			</form>

			{
				colorState.isLoading ? 
				<h1>Loading</h1> : null
			}

			{
				colorState.error ?
				<h1>{colorState.error.message}</h1> : null
			}

			<div id="swatches_container">
				{
					colorState.colors ? 
					colorState.colors.map(color => <Swatch color={color} />) : null
				}
			</div>
    </>
  )
}

export default App
