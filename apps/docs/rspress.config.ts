import { defineConfig } from "rspress/config";

export default defineConfig({
	root: "docs",
	title: "GengarNeko",
	icon: "./public/rspress-icon.png",
	logo: "https://gravatar.com/avatar/237cbf6b0482ea079b8c98e85e2685a2?size=256&cache=1730712269518",
	themeConfig: {
		socialLinks: [
			{
				icon: "github",
				mode: "link",
				content: "https://github.com/gengarneko",
			},
		],
	},
	globalStyles: "styles/index.css",
	globalUIComponents: [["ui/footer.tsx", { foo: "bar" }]],
	builderConfig: {
		source: { alias: { "@": "./docs" } },
	},
});
