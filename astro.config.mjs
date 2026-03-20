// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkSimplePlantuml from "@akebifiky/remark-simple-plantuml";
import { visit } from "unist-util-visit";
import starlightThemeGalaxy from "starlight-theme-galaxy";
import starlightFullViewMode from "starlight-fullview-mode";
import starlightCodeblockFullscreen from "starlight-codeblock-fullscreen";

/** Remark plugin: converte i blocchi ```mermaid in <pre class="mermaid">
 *  prima che expressive-code li processi, così vengono renderizzati lato client.
 *  @returns {(tree: unknown) => void}
 */
function remarkMermaid() {
  return function (tree) {
    visit(
      /** @type {any} */ (tree),
      "code",
      /**
       * @param {{ lang?: string, value: string }} node
       * @param {number | undefined} index
       * @param {{ children: unknown[] } | undefined} parent
       */
      function (node, index, parent) {
        if (node.lang !== "mermaid" || !parent || typeof index !== "number") {
          return;
        }

        const escaped = node.value
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        const htmlNode = {
          type: "html",
          value: `<pre class="mermaid">${escaped}</pre>`,
        };

        parent.children[index] = htmlNode;
      },
    );
  };
}

const base = "/info-quarta/";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: {
        it: "Informatica in quarta",
        en: "Computer Science in Year 4",
      },
      logo: {
        src: "./src/assets/images/brand-icon-128.png",
      },
      plugins: [
        starlightThemeGalaxy(),
        starlightFullViewMode({
          leftSidebarEnabled: true,
          rightSidebarEnabled: true,
          rightSidebarExpandedWidth: "20%",
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
      favicon: "/brand-icon-128.png",
      customCss: ["./src/styles/custom.css"],
      head: [
        {
          tag: "script",
          attrs: {
            type: "module",
            src: `${base}scripts/mermaid-init.js`,
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/malafronte",
        },
      ],
      sidebar: [
        {
          label: "🧑‍💻 Corso di Informatica",
          translations: { en: "🧑‍💻 Computer Science Course" },
          collapsed: false,
          items: [
            {
              label: "Panoramica del corso",
              translations: { en: "Course overview" },
              slug: "corso",
            },
            {
              label: "💻 Advanced C#",
              collapsed: true,
              translations: {
                en: "💻 Advanced C#",
              },
              items: [
                { slug: "corso/advanced-csharp" },
                { slug: "corso/advanced-csharp/delegates" },
                { slug: "corso/advanced-csharp/lambda" },
                { slug: "corso/advanced-csharp/events" },
                { slug: "corso/advanced-csharp/linq" },
                {
                  label: "EF Core",
                  autogenerate: { directory: "corso/advanced-csharp/ef-core" },
                  collapsed: true,
                },
                {
                  label: "Concurrent Computing",
                  autogenerate: {
                    directory: "corso/advanced-csharp/concurrent-computing",
                  },
                  collapsed: true,
                },
                {
                  label: "Network Programming",
                  autogenerate: {
                    directory: "corso/advanced-csharp/network-programming",
                  },
                  collapsed: true,
                },
                {
                  label: "REST API",
                  autogenerate: {
                    directory: "corso/advanced-csharp/rest-api",
                  },
                  collapsed: true,
                },
                {
                  label: "App Development with .NET MAUI",
                  autogenerate: {
                    directory: "corso/advanced-csharp/mobile-apps",
                  },
                  collapsed: true,
                },
              ],
            },
          ],
        },
        {
          label: "🛠️ Dev tools",
          collapsed: true,
          translations: {
            en: "🛠️ Dev tools",
          },
          items: [
            { slug: "dev-tools" },
            { slug: "dev-tools/shells" },
            { slug: "dev-tools/winget" },
            { slug: "dev-tools/win-utilities" },
            { slug: "dev-tools/vs-code-installation" },
            { slug: "dev-tools/vs-installation" },
            {
              label: "↗︎ Git",
              autogenerate: { directory: "dev-tools/git" },
              collapsed: true,
            },
            {
              label: "🐍 🔄 Python tools and workflows",
              autogenerate: {
                directory: "dev-tools/python",
              },
              collapsed: true,
            },
            {
              label: "☸️ DevOps",
              autogenerate: {
                directory: "dev-tools/devops",
              },
              collapsed: true,
            },
            {
              label: "🐳 Docker",
              autogenerate: {
                directory: "dev-tools/docker",
              },
              collapsed: true,
            },
            {
              label: "📝 Markdown",
              autogenerate: {
                directory: "dev-tools/markdown",
              },
              collapsed: true,
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
          autogenerate: { directory: "guides" },
        },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 5 },
      components: {
        //Header: "./src/components/CustomHeader.astro",
        Footer: "./src/components/CustomFooter.astro",
      },
      expressiveCode: {
        themes: ["houston", "light-plus"],
        frames: {
          showCopyToClipboardButton: true,
        },
      },
    }),
  ],
  // Enable remark plugin to convert emoji shortcodes like :tent: into unicode
  markdown: {
    remarkPlugins: [
      remarkMermaid,
      remarkSimplePlantuml,
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
  base: base,
});
