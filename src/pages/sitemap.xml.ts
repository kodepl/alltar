import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL('https://www.alltar.pl');
  const posts = await getCollection('karta');
  const paths = [
    '/',
    '/karta/',
    '/kuchnia/',
    '/kartka/',
    '/prywatnosc/',
    ...posts
      .map((post) => `/karta/${post.slug}/`)
      .sort((a, b) => a.localeCompare(b, 'pl')),
  ];
  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, origin).href}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
