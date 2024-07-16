import Swatch from "./Swatch";

function Swatches({ colorState }) {
	return (
		<>
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

export default Swatches;