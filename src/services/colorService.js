const BASE_URL = "https://www.thecolorapi.com";

// Return an array of numbers representing a series of hue values
function getHueValues(start=0, end=360, increment=5) {
	const values = [];

	for (let i = start; i <= end; i += increment) {
		values.push(i);
	}

	return values;
}

// Fetch color object from API using provided HSL values
async function getColor(hue, saturation, light) {
	const response = await fetch(`${BASE_URL}/id?hsl=${hue},${saturation}%,${light}%`);
	const color = await response.json();

	return color;
}

// Return an array of color objects given an array of hue values
async function getColors(hues, saturation, light) {
	const colorsPromises = hues.map(hue => getColor(hue, saturation, light));
	const colors = await Promise.all(colorsPromises);

	return colors;
}

// Return a refined clone of the "colors" argument (array of color objects)
// Refined array includes missing "in-between" color objects
async function getRefinedColors(colors) {
	const { s: saturation, l: light } = colors[0].hsl;
	const result = [];

	for (let i = 0; i < colors.length - 1; i++) {
		const currentColor = colors[i];
		const nextColor = colors[i + 1];

		// If current color and next color are different names...
		if (currentColor.name.value !== nextColor.name.value) {

			// Generate array of hue values between those two colors
			const refinedHueValues = getHueValues(
				currentColor.hsl.h + 1, 
				nextColor.hsl.h - 1, 
				1
			);

			// Retrieve all colors for array of hue values
			let refinedColors = await getColors(
				refinedHueValues, 
				saturation, 
				light
			)

			result.push(currentColor);
			result.push(...refinedColors);
		}
	}

	return result;
}

// Filter array of color objects to objects with unique color names
function filterByUniqueNames(colors) {
	const result = colors.reduce((acc, color) => {
		if (!acc[color.name.value]) acc[color.name.value] = color; 
		return acc;
	}, {});

	return Object.values(result);
}

// Return all colors with given saturation and light values 
async function getUniqueColors(saturation, light) {
	const hueValues = getHueValues();
	const colors = await getColors(hueValues, saturation, light)
	const refinedColors = await getRefinedColors(colors);
	const uniqueColors = filterByUniqueNames(refinedColors);

	return uniqueColors;
}


export default {
	getUniqueColors
}