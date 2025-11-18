// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import mermaid from "astro-mermaid";
import plantuml from "astro-plantuml";
import starlightThemeFlexoki from "starlight-theme-flexoki";
import starlightFullViewMode from "starlight-fullview-mode";
import starlightCodeblockFullscreen from "starlight-codeblock-fullscreen";

// https://astro.build/config
export default defineConfig({
  integrations: [
    plantuml(),
    mermaid({
      theme: "forest",
      autoTheme: true,
    }),
    starlight({
      title: {
        it: "Informatica in quarta",
        en: "Computer Science in Year 4",
      },
      plugins: [
        starlightThemeFlexoki({
          accentColor: "cyan",
        }),
        starlightFullViewMode({
          leftSidebarEnabled: true,
          rightSidebarEnabled: true,
        }),
        starlightCodeblockFullscreen({
          // Optional configuration
          fullscreenButtonTooltip: "Schermo intero",
          enableEscapeKey: true,
          exitOnBrowserBack: true,
          // Add fullscreen button to all code blocks, not only titled/terminal ones
          addToUntitledBlocks: true,
        }),
      ],
      // Enable multilingual docs: Italian as root (no /it/ prefix) and English under /en/
      defaultLocale: "root",
      locales: {
        root: { label: "Italiano", lang: "it" },
        en: { label: "English", lang: "en" },
      },
      customCss: ["./src/styles/custom.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/malafronte/info-quarta",
        },
      ],
      sidebar: [
        {
          label: "Corso di Informatica",
          translations: { en: "Computer Science Course" },
          collapsed: false,
          items: [
            {
              label: "Panoramica del corso",
              translations: { en: "Course overview" },
              slug: "corso",
            },
            {
              label: "Git e GitHub",
              translations: {
                en: "Git and GitHub",
              },
              autogenerate: { directory: "corso/git-and-github" },
            },
          ],
        },
        {
          label: " 📚 Progetti",
          translations: { en: " 📚 Projects" },
          collapsed: true,
          autogenerate: { directory: "projects" },
        },
        {
          label: "📖 Guide",
          translations: { en: "📖 Guides" },
          collapsed: true,
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Guide",
              translations: { en: "Guides" },
              slug: "guides/example",
            },
          ],
        },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      components: {
        // Footer override example
        // Footer: "./src/components/Footer.astro",
      },
      expressiveCode: {
        frames: {
          showCopyToClipboardButton: true,
        },
      },
    }),
  ],
  // Enable remark plugin to convert emoji shortcodes like :tent: into unicode
  markdown: {
    remarkPlugins: [
      remarkEmoji,
      // Configura remark-math per gestire meglio le espressioni matematiche
      [
        remarkMath,
        {
          singleDollarTextMath: true,
        },
      ],
    ],
    rehypePlugins: [
      [
        rehypeKatex,
        {
          // Configurazioni per gestire meglio MDX e LaTeX
          strict: false,
          trust: true,
          throwOnError: false,
          // Opzioni aggiuntive per compatibilità MDX
          output: "html",
          macros: {
            "\\text": "\\mathrm",
          },
        },
      ],
    ],
  },
  site: "https://malafronte.github.io",
  base: "/info-quarta/",
});
