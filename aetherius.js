import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

const cfg = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const { default: Aetherius } = await import("./src/Aetherius.mjs");

const app = new Aetherius(cfg);
await app.init();
const port = process.env.PORT || 8787;
app.listen(port, () =>
  console.log(`[AETHERIUS] up on :${port} mode=${process.env.MODE || "SAFE"}`)
);
