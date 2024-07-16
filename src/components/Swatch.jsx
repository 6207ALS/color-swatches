function Swatch({ color }) {
	return (
		<div className="swatch_container">
			<img src={color.image.bare}/>
			<p>{color.name.value}</p>
		</div>
	)
}

export default Swatch;