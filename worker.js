// Cloudflare Worker: Simple Roblox API CORS proxy
// Usage after deploy: set CONFIG.mode = "custom" and CONFIG.customBase = "https://<your-worker-subdomain>"
// This worker exposes:
//   GET/POST  https://<worker>/users/<...>       -> https://users.roblox.com/<...>
//   GET       https://<worker>/thumbnails/<...>  -> https://thumbnails.roblox.com/<...>
//   GET       https://<worker>/avatar/<...>      -> https://www.roblox.com/<...>   (image endpoints)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS"){
      return new Response(null, { headers: corsHeaders });
    }
    const url = new URL(request.url);
    let upstream = "";
    if (url.pathname.startsWith("/users/")){
      upstream = "https://users.roblox.com" + url.pathname.replace("/users","") + url.search;
    }else if (url.pathname.startsWith("/thumbnails/")){
      upstream = "https://thumbnails.roblox.com" + url.pathname.replace("/thumbnails","") + url.search;
    }else if (url.pathname.startsWith("/avatar/")){
      upstream = "https://www.roblox.com" + url.pathname.replace("/avatar","") + url.search;
    }else{
      return new Response("Not found", { status: 404, headers: corsHeaders });
    }
    const init = {
      method: request.method,
      headers: new Headers(request.headers),
      body: ["GET","HEAD"].includes(request.method) ? undefined : await request.arrayBuffer()
    };
    // Don't forward some headers that can break CORS
    init.headers.delete("Host");
    init.headers.delete("Origin");

    const resp = await fetch(upstream, init);
    // Clone and set CORS headers
    const newHeaders = new Headers(resp.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Vary", "Origin");
    return new Response(resp.body, { status: resp.status, headers: newHeaders });
  }
};
