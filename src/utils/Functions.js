import { useState, useLayoutEffect } from 'react'


export const convertSettings = (obj) => {

	if (obj === undefined) {
		return false;
	}
	let settings_obj = {};

	// Loop over objects and format for theming
	for (const [key, value] of Object.entries(obj)) {
		value.map((setting) => {
		let nice_name = setting.name.text
		nice_name = nice_name.toLowerCase()


		let cur_obj = {};
		let setValues;

		switch (key) {
			case "colour_palette":
			setValues = setting.colour;
			break;
			
			case "typography":
			setValues = {
				font: setting.font,
				weights: setting.weights
			};
			
			break;
			
			default:
			break;
		}

		cur_obj[nice_name] = setValues;
		return settings_obj[key] = {...settings_obj[key], ...cur_obj};
		
		},(key))
	}

	return settings_obj;

}


export const useWindowSize = () => {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
		setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return size;
}
