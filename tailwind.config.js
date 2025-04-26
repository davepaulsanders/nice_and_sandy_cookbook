/** @type {import('tailwindcss').Config} */
const colors = {
	background: "#2a5a40",
	lightg: "#cad2c5",
	medg:"#84a98c",
	lgg: "#52796f",
	xlg: "#354f52",	
	xxlg: "#2f3e46",
	darkg: "#283618",
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
		 colors: colors,
		 boxShadow: { 
			 lg: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
		}
      }
  },
  plugins: [],
}

