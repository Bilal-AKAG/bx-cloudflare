import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "bx-portfolio",
		compatibilityDate: "2025-09-24",
		compatibilityFlags: [
			"nodejs_compat",
		],
		entrypoint: "@tanstack/react-start/server-entry",
	},
});
