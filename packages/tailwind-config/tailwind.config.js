const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./src/**/*.{ts,tsx}",
		// "../../packages/ui/src/**/*.{ts,tsx}",
		"../../packages/tailwind-config/tailwind.config.js",
	],
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-animate"),
		require("tailwind-scrollbar"),
	],
};
