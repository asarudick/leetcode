import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const root = createRoot(document.getElementById('root')!);
root.render(<BrowserRouter><App /></BrowserRouter>);

if (!document.getElementById('theme-style')) {
  document.head.insertAdjacentHTML('beforeend', `<style id="theme-style">
:root {
  --base: #1e1e2e;
  --mantle: #1e1e2e;
  --crust: #11111b;
  --text: #cdd6f4;
  --subtext0: #a6adc8;
  --lavender: #b4befe;
  --blue: #89b4fa;
  --sky: #89dceb;
  --surface0: #313244;
  --overlay0: #313244;
  --mauve: #cba6f7;
}
html, body {
  background-color: var(--base);
  color: var(--text);
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, sans-serif;
}
#root {
  min-height: 100vh;
  background-color: var(--base);
  color: var(--text);
}
  </style>`);
}