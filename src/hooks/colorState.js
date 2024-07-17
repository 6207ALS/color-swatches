import { useReducer } from "react";
import colorService from "../services/colorService";

// Reducer function to update state for searched color
const colorReducer = (state, action) => {
  switch(action.type) {
    case "isLoading": {
      return { ...state, isLoading: true, colors: null, }
    }
    case "isLoaded": {
      return { ...state, isLoading: false, error: null, colors: action.colors, }
    }
    case "setSaturation": {
      return { ...state, saturation: action.saturation, validationError: null,}
    } 
    case "setLight": {
      return { ...state, light: action.light, validationError: null, }
    }
    case "setError": {
      return { ...state, isLoading: false, error: action.error, }
    }
    case "setValidationError": {
      return { ...state, validationError: action.validationError, }
    }
  }
}

// Custom state management hook for colors
function useColorState() {

  // Manages state for colors
  const [ colorState, colorDispatch ] = useReducer(colorReducer, { 
    isLoading: false, 
    colors: null,
    error: null,
    saturation: "",
    light: ""
  });

  // Make API call to retrieve colors according to saturation & light states
	const handleGetColors = async () => {
		const { saturation, light } = colorState;
    
		try {
      colorDispatch({ type: "isLoading" });
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

  // Return boolean indicating if input value is valid
  const isValidInput = (value, start=0, end=100) => {
    return value.trim() &&
      !isNaN(value) &&
      Number(value) >= start &&
      Number(value) <= end
  }

  // Updates state upon validating inputs
  const validateInputs = () => {
    const { saturation, light } = colorState;

    if (!isValidInput(saturation)) {
      colorDispatch({ 
        type: "setValidationError", 
        validationError: "Saturation must be a value between 0 - 100"})
      return false;
    } else if (!isValidInput(light)) {
      colorDispatch({ 
        type: "setValidationError", 
        validationError: "Light must be a value between 0 - 100"})
      return false;
    }

    return true;
  }

  return {
    colorState,
    handleGetColors,
    handleSaturationChange,
    handleLightChange,
    validateInputs
  }
}

export default useColorState;