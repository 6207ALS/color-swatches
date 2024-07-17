function HSLForm({ 
	colorState,
	handleGetColors,
	handleSaturationChange,
	handleLightChange,
	validateInputs,
	}) {

	const onFormSubmit = (e) => {
		e.preventDefault();

		const isValidated = validateInputs()
		if (isValidated) handleGetColors();
	}

	const onSaturationChange = (e) => handleSaturationChange(e);
	const onLightChange = (e) => handleLightChange(e);

	return (
		<div id="hsl-form_container">
			<h1>Swatches</h1>
			
			{
				colorState.validationError ?
				<p className="message">{colorState.validationError}</p> : null
			}

			<form onSubmit={onFormSubmit} id="hsl_form">
				<div className="hsl_input">
					<label htmlFor="saturation_input">Saturation: </label>
					<input 
						id="saturation_input" 
						type="text"
						onChange={onSaturationChange}
					/>
				</div>

				<div className="hsl_input">
					<label htmlFor="light_input">Light:</label>
					<input 
						id="light_input" 
						type="text"
						onChange={onLightChange}
					/>
				</div>

				<button type="submit">Search</button>
			</form>
		</div>
		
	)
}

export default HSLForm;