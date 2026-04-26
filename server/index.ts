import express from "express";
import { createServer } from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { getRouteSeo } from "../client/src/lib/routeSeo";
import { injectSeoIntoHtml } from "./seoHtml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.get("/", (_req, res) => {
    res.redirect(302, "/nl/");
  });

  const crawlFiles = {
    "/robots.txt": "robots.txt",
    "/sitemap.xml": "sitemap.xml",
    "/site.webmanifest": "site.webmanifest",
  } as const;

  for (const [requestPath, fileName] of Object.entries(crawlFiles)) {
    app.get(requestPath, (_req, res, next) => {
      res.sendFile(path.join(staticPath, fileName), (error) => {
        if (error) {
          next(error);
        }
      });
    });
  }

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", async (req, res, next) => {
    try {
      const html = await fs.readFile(path.join(staticPath, "index.html"), "utf8");
      const seo = getRouteSeo(req.path);
      res.status(seo.statusCode).type("html").send(injectSeoIntoHtml(html, req.path));
    } catch (error) {
      next(error);
    }
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
