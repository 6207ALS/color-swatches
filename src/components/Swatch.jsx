function Swatch({ color }) {
	return (
		<div className="swatch_container">
			<div className="swatch-img_container"> 
				<img src={color.image.bare} />
			</div>
			<div className="swatch-info_container">
				<p>{`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}</p>
			</div>
			<p>{color.name.value}</p>
		</div>
	)
}

export default Swatch;