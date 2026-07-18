// Unified API layer: legacy json-server URLs (http://localhost:3001/*)
// are served by Cloudflare Pages Functions at /api/* in production.
// Covers both fetch() and axios callers.
import axios from 'axios';

const LEGACY = /^https?:\/\/localhost:3001/;

const _fetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  if (typeof input === 'string') input = input.replace(LEGACY, '/api');
  return _fetch(input, init);
};

axios.interceptors.request.use((config) => {
  if (config.url) config.url = config.url.replace(LEGACY, '/api');
  return config;
});

export default {};
