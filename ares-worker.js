/**
 * Cloudflare Worker – ARES CORS Proxy
 *
 * Deploys as a Cloudflare Worker to proxy requests to the Czech ARES API
 * (ares.gov.cz) which does not support CORS headers.
 *
 * Setup:
 * 1. Go to https://dash.cloudflare.com/ → Workers & Pages → Create
 * 2. Name it e.g. "ares-proxy" → Deploy
 * 3. Click "Edit Code", paste this file, click "Deploy"
 * 4. Your worker URL will be: https://ares-proxy.<your-subdomain>.workers.dev
 * 5. Update ARES_PROXY_URL in admin.html with your worker URL
 *
 * Usage from browser:
 *   GET  https://ares-proxy.xxx.workers.dev/86803670
 *   POST https://ares-proxy.xxx.workers.dev/vyhledat  { "obchodniJmeno": "Adam", ... }
 */

const ARES_BASE = "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

export default {
  async fetch(request) {
    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+/, "");

    if (!path) {
      return new Response(
        JSON.stringify({ error: "Usage: GET /{ico} or POST /vyhledat" }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const aresUrl = ARES_BASE + "/" + path;
    const fetchOpts = {
      method: request.method,
      headers: { "Accept": "application/json" },
    };

    if (request.method === "POST") {
      fetchOpts.headers["Content-Type"] = "application/json";
      fetchOpts.body = await request.text();
    }

    try {
      const resp = await fetch(aresUrl, fetchOpts);
      const body = await resp.text();

      return new Response(body, {
        status: resp.status,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": resp.headers.get("Content-Type") || "application/json",
        },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err.message }),
        { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }
  },
};
