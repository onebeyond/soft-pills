import { defineConfig } from "vitepress";
import { getMainPillsLink, getSideBarItems } from "../utils";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Soft-Pills",
  base: "/soft-pills/",
  description:
    "🤝 A list of experiences and reflections in the form of small pills, about skills to improve in management positions.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "algolia",
      options: {
        appId: "YEIZQWKHWT",
        apiKey: "532398c5e31ddd5a0f294cd1c39c3ac8",
        indexName: "pill_name",
      },
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Pills", link: getMainPillsLink() },
    ],

    sidebar: [
      {
        text: "One Beyond Pills",
        items: [...getSideBarItems()],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
