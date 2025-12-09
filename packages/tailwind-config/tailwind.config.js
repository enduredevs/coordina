const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./src/**/*.{ts,tsx}",
		"../../packages/ui/src/**/*.{ts,tsx}",
		"../../packages/tailwind-config/tailwind.config.js",
	],
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-animate"),
		require("tailwind-scrollbar"),
	],
	theme: {
		extend: {
			 boxShadow: {
        huge: "0px 51px 78px rgb(17 7 53 / 5%), 0px 21.3066px 35.4944px rgb(17 7 53 / 4%), 0px 11.3915px 18.9418px rgb(17 7 53 / 3%), 0px 6.38599px 9.8801px rgb(17 7 53 / 3%), 0px 3.39155px 4.58665px rgb(17 7 53 / 2%), 0px 1.4113px 1.55262px rgb(17 7 53 / 1%), inset 0px 1px 0px rgb(41 56 78 / 5%)",
      },
      colors: {
        primary: {
          ...colors.indigo,
          DEFAULT: colors.indigo["600"],
          foreground: colors.indigo["50"],
          background: colors.indigo["50"],
        },
        secondary: {
          background: colors.indigo["50"],
          DEFAULT: colors.indigo["50"],
          foreground: colors.indigo["600"],
        },
        gray: colors.gray,
        border: colors.gray["200"],
        input: {
          DEFAULT: colors.gray["200"],
          background: colors.white,
          foreground: colors.gray["700"],
        },
        ring: {
          DEFAULT: colors.gray["300"],
        },
        destructive: {
          DEFAULT: colors.rose["600"],
          background: colors.rose["50"],
          foreground: colors.rose["50"],
        },
        background: colors.white,
        foreground: colors.gray["700"],
        accent: {
          DEFAULT: colors.gray["100"],
        },
        "action-bar": {
          DEFAULT: colors.gray["800"],
          foreground: colors.gray["50"],
        },
        muted: {
          DEFAULT: colors.gray["100"],
          background: colors.gray["50"],
          foreground: colors.gray["500"],
        },
        popover: {
          DEFAULT: colors.white,
          foreground: colors.gray["700"],
        },
        card: {
          DEFAULT: colors.white,
          background: colors.white,
          foreground: colors.gray["700"],
        },
        sidebar: {
          DEFAULT: colors.gray["100"],
          foreground: colors.gray["700"],
          border: colors.gray["200"],
          accent: {
            DEFAULT: colors.gray["200"],
            foreground: colors.gray["800"],
          },
        },
      },

		}
	}
};
