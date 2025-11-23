import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { pluginCollapsibleSections, pluginCollapsibleSectionsTexts } from '@expressive-code/plugin-collapsible-sections'

// Add Italian translations for collapsible sections
pluginCollapsibleSectionsTexts.addLocale('it', {
    collapsedLines: '{lineCount} {lineCount;1=riga nascosta;righe nascoste}',
})

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
    plugins: [
        pluginLineNumbers(),
        pluginCollapsibleSections(),
    ],
    defaultProps: {
        // Disable line numbers by default
        showLineNumbers: false,
        // But enable line numbers for certain languages
        // overridesByLang: {
        //   'js,ts,html': {
        //     showLineNumbers: true,
        //   },
        // },
        // Change the default style of collapsible sections
        collapseStyle: 'collapsible-auto',
    },
}