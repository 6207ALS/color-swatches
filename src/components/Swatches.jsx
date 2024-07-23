import Swatch from "./Swatch";
import LoadingIcon from "./LoadingIcon"

function Swatches({ colorState }) {
  return (
    <>
      { 
        colorState.colors ? 
        <p>Your search input matched {colorState.colors.length} colors. </p> : null
      }
      <div id="swatches_container">
        {
          colorState.isLoading ? 
            <LoadingIcon /> : null
        }
        {
          colorState.colors ? 
            colorState.colors.map(color => <Swatch 
              key={color.hex.value} 
              color={color} 
            />) : null
        }
      </div>
    </>
  )
}

export default Swatches;