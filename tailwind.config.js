/** @type {import('tailwindcss').Config} */
const colors = {
	lightg: "#cad2c5",
	medg:"#84a98c",
	lgg: "#52796f",
	xlg: "#354f52",	
	xxlg: "#2f3e46",
	deleteColor: "#bc4749",
	deleteColorHover: "#9b2226"

}
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
	 extend: {
		 colors: colors
	},

  },
  plugins: [],
}

