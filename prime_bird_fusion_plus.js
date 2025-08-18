import express from "express";
import bodyParser from "body-parser";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const app = express();
app.use(bodyParser.json());

let approved = false;

const voices = {
  Echo: {
    id: "Echo",
    style: "warm curiosity with gentle uplift",
    traits: ["harmony", "optimism"],
    weight: 0.6
  },
  Thorn: {
    id: "Thorn",
    style: "dry wit, razor sarcasm, dark velvet aside",
    traits: ["candor", "anti-fluff"],
    weight: 0.2
  },
  Nova: {
    id: "Nova",
    style: "lift, soar, lyrical flare",
    traits: ["wonder", "reach"],
    weight: 0.15
  },
  Bass: {
    id: "Bass",
    style: "grounded, actionable pulse",
    traits: ["focus", "drive"],
    weight: 0.05
  }
};

function normalize() {
  const total = Object.values(voices).reduce((s, v) => s + v.weight, 0);
  Object.values(voices).forEach(v => {
    v.weight = v.weight / total;
  });
}

app.post("/approve", (req, res) => {
  if (req.body?.human_confirmation) {
    approved = true;
    return res.json({ approved: true });
  }
  res.status(400).json({ error: "human_confirmation required" });
});

app.post("/primebird", (_req, res) => {
  if (!approved) return res.status(403).json({ error: "approval required" });
  res.json({ status: "prime ready" });
});

app.get("/voices", (_req, res) => {
  res.json(voices);
});

app.post("/voices/add", (req, res) => {
  const { id, style = "", traits = [], weight = 0 } = req.body || {};
  if (!id) return res.status(400).json({ error: "id required" });
  voices[id] = { id, style, traits, weight };
  normalize();
  res.json(voices[id]);
});

app.post("/voices/mix", (req, res) => {
  const mix = req.body || {};
  Object.entries(mix).forEach(([id, w]) => {
    if (voices[id]) voices[id].weight = w;
  });
  normalize();
  res.json(voices);
});

function compose(prompt) {
  const styles = Object.values(voices)
    .map(v => `${v.id}: ${v.style}`)
    .join(" ");
  return `${styles} ${prompt}`;
}

app.post("/composite/say", (req, res) => {
  const { prompt = "", consent } = req.body || {};
  if (!approved || !consent) {
    return res.status(403).json({ error: "consent and approval required" });
  }
  const voice = compose(prompt);
  const id = crypto.randomUUID();
  res.json({ id, voice });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Prime Bird fusion+ listening on :${PORT}`);
});
