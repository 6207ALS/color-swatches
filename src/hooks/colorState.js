import { useReducer } from "react";
import colorService from "../services/colorService";

// Reducer function to update state for searched color
const colorReducer = (state, action) => {
  switch(action.type) {
    case "isLoading": {
      return { ...state, isLoading: true, colors: [], }
    }
    case "isLoaded": {
      return { ...state, isLoading: false, error: null, colors: action.colors, }
    }
    case "setError": {
      return { ...state, isLoading: false, error: action.error, }
    }
    case "setSaturation": {
      return { ...state, saturation: action.saturation, }
    } 
    case "setLight": {
      return { ...state, light: action.light, }
    }
  }
}

// Custom state management hook for colors
function useColorState() {

  // Manages state for colors
  const [ colorState, colorDispatch ] = useReducer(colorReducer, { 
    isLoading: false, 
    colors: [],
    error: null,
    saturation: "",
    light: ""
  });

  // Make API call to retrieve colors according to saturation & light states
	const handleGetColors = async (e) => {
		e.preventDefault();
		const { saturation, light } = colorState;
		colorDispatch({ type: "isLoading" });

		try {
			const colors = await colorService.getUniqueColors(saturation, light);
			colorDispatch({ type: "isLoaded", colors })
		} catch (error) {
			colorDispatch({ type: "setError", error })
		}
	}

  // Update saturation state according to input change
	const handleSaturationChange = (e) => {
		colorDispatch({ type: "setSaturation", saturation: e.target.value })
	}

  // Update light state according to input change
	const handleLightChange = (e) => {
		colorDispatch({ type: "setLight", light: e.target.value })
	}

  return {
    colorState,
    handleGetColors,
    handleSaturationChange,
    handleLightChange,
  }
}

export default useColorState;