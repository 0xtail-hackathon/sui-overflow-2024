// vite.config.ts
import { defineConfig } from "vite";

// Plugins
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"; // for resolving paths in tsconfig.json
import svgr from "vite-plugin-svgr"; // for importing SVG files as React components

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), svgr()],
	base: "/sui-overflow-2024/",
});
