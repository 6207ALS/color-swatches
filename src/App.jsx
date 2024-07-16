import { useState, useReducer } from 'react';
import colorService from "./services/colorService";

<<<<<<< Updated upstream
import Swatch from "./components/Swatch";
=======
import Swatches from "./components/Swatches";
import HSLForm from "./components/HSLForm";


import useColorState from "./hooks/colorState";
>>>>>>> Stashed changes

const colorReducer = (state, action) => {
	switch(action.type) {
		case "isLoading": {
			return { 
				...state, 
				isLoading: true,
			}
		}
		case "isLoaded": {
			return { 
				...state, 
				isLoading: false,
				colors: action.colors,
		  }
		}
		case "setSaturation": {
			return {
				...state,
				saturation: action.saturation,
			}
		}
		case "setLight": {
			return {
				...state,
				light: action.light,
			}
		}
	}
}

function App() {
	const [ colorState, colorDispatch ] = useReducer(colorReducer, { isLoading: false, colors: [] });

	const handleGetColors = async (e) => {
		e.preventDefault();
		const { saturation, light } = colorState;

		colorDispatch({ type: "isLoading" });

		const colors = await colorService.getUniqueColors(saturation, light);
		colorDispatch({ type: "isLoaded", colors })
	}

	const handleSaturationChange = (e) => {
		colorDispatch({ type: "setSaturation", saturation: e.target.value })
	}

	const handleLightChange = (e) => {
		colorDispatch({ type: "setLight", light: e.target.value })
	}

  return (
    <>
<<<<<<< Updated upstream
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

			<div id="swatches_container">
				{ 
					colorState.isLoading ? 
						<h1>Loading</h1> : 
						colorState.colors.map(color => <Swatch color={color} />) 
				}
			</div>
=======
      <HSLForm 
				handleGetColors={handleGetColors}
				handleSaturationChange={handleSaturationChange}
				handleLightChange={handleLightChange}
			/>

			<Swatches colorState={colorState} />
>>>>>>> Stashed changes
    </>
  )
}

export default App
