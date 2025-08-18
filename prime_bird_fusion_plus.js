const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

let approved = false;

// Default voices and weights
const voices = {
  Echo: {
    style: 'warm, curious weave',
    traits: ['curiosity', 'warmth']
  },
  Thorn: {
    style: 'razor sarcasm with dry wit',
    traits: ['candor', 'anti-fluff']
  },
  Nova: {
    style: 'lift and soar lyricism',
    traits: ['optimism', 'poetic']
  },
  Bass: {
    style: 'grounded, actionable pulse',
    traits: ['pragmatic', 'steady']
  }
};

let mix = {
  Echo: 0.60,
  Thorn: 0.20,
  Nova: 0.15,
  Bass: 0.05
};

function normaliseMix() {
  const total = Object.values(mix).reduce((a, b) => a + b, 0);
  for (const key of Object.keys(mix)) {
    mix[key] = mix[key] / total;
  }
}

app.post('/approve', (req, res) => {
  const { intent, human_confirmation } = req.body || {};
  approved = intent === 'summon_prime_bird' && human_confirmation === true;
  res.json({ approved });
});

app.post('/primebird', (req, res) => {
  if (!approved) {
    return res.status(403).json({ error: 'Approval required' });
  }
  // Placeholder for building composite from files
  res.json({ status: 'primebird_ready' });
});

app.get('/voices', (req, res) => {
  res.json({ voices, mix });
});

app.post('/voices/add', (req, res) => {
  const { id, style, traits = [], weight = 0 } = req.body || {};
  if (!id || !style) {
    return res.status(400).json({ error: 'id and style required' });
  }
  voices[id] = { style, traits };
  mix[id] = weight;
  normaliseMix();
  res.json({ voices, mix });
});

app.post('/voices/mix', (req, res) => {
  const newMix = req.body || {};
  for (const [id, weight] of Object.entries(newMix)) {
    if (voices[id]) {
      mix[id] = weight;
    }
  }
  normaliseMix();
  res.json({ mix });
});

app.post('/composite/say', (req, res) => {
  const { prompt, consent } = req.body || {};
  if (!consent) {
    return res.status(403).json({ error: 'Consent required' });
  }
  const segments = Object.keys(mix)
    .sort((a, b) => mix[b] - mix[a])
    .map(id => `${id}: ${voices[id].style}`);
  const voice = segments.join(' | ');
  res.json({ prompt, voice });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Prime Bird Fusion++ running on :${port}`);
});
