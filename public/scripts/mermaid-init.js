import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'forest';
}

async function renderMermaid() {
  const diagrams = document.querySelectorAll('pre.mermaid');
  if (!diagrams.length) return;
  mermaid.initialize({ startOnLoad: false, theme: getTheme() });
  for (const el of diagrams) {
    if (!el.dataset.mermaidSrc) {
      el.dataset.mermaidSrc = el.textContent ?? '';
    } else {
      el.textContent = el.dataset.mermaidSrc;
    }
    // Rimuove il flag che Mermaid imposta dopo il primo rendering,
    // altrimenti salta l'elemento e mostra il codice grezzo.
    el.removeAttribute('data-processed');
  }
  await mermaid.run({ querySelector: 'pre.mermaid' });
}

document.addEventListener('astro:page-load', renderMermaid);
new MutationObserver(renderMermaid).observe(
  document.documentElement,
  { attributes: true, attributeFilter: ['data-theme'] }
);
