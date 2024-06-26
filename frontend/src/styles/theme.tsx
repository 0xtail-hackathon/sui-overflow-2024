const theme = {
	colors: {
		primary: "#00B2FF",
		secondary: "#00b3ff1a",
		emphasis: "#FF5C01",
		white: "#FFFFFF",
		black: "#222222",
		gray: "#7D7B7B",
		light_gray: "#E4E4E4",
		splitter: "#D9D9D9",
		search_bar_bg: "#F3F4F6",
		bg: "#F5F8FF",
		header_bg: "#FFFFFF",
		sidebar_bg: "#FFFFFF",
	},
	fonts: {
		primary: "Arial, sans-serif",
	},
	shadows: {
		style1: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
		style2: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
	},
};
export type ThemeType = typeof theme;
export default theme;
