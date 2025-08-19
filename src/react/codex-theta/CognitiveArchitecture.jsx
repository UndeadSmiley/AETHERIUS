import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Eye, Zap, Database, Network, Settings, Target, TrendingUp, Cpu, Memory, Activity } from 'lucide-react';
// import * as math from 'mathjs'; // (unused for now)

const MAX_BUF = 5;
const MAX_STM = 7;  // 7±2; pick 7
const MAX_HISTORY = 50;

export default function CognitiveArchitecture() {
  // Core cognitive modules
  const [perceptionModule, setPerceptionModule] = useState({
    sensoryBuffer: [],
    featureDetectors: [],
    objectRecognition: [],
    attentionFilter: null
  });

  const [memorySystem, setMemorySystem] = useState({
    sensoryMemory: [],          // 0.25–4 s
    shortTermMemory: [],        // 15–30 s
    workingMemory: [],          // active
    longTermMemory: [],         // persistent
    episodicMemory: [],         // autobiographical
    semanticMemory: new Map(),  // facts/concepts
    proceduralMemory: new Map() // skills
  });

  const [executiveControl, setExecutiveControl] = useState({
    goalStack: [],
    attentionController: null,
    conflictMonitor: { conflicts: [] },
    cognitiveLoad: 0,
    inhibitionLevel: 0.5,
    taskSwitchCost: 0
  });

  const [reasoningEngine, setReasoningEngine] = useState({
    analogicalReasoning: [],
    causalReasoning: [],
    deductiveChains: [],
    inductivePatterns: [],
    abductiveHypotheses: [],
    mentalModels: []
  });

  const [learningSystem, setLearningSystem] = useState({
    reinforcementLearning: { qTable: new Map(), epsilon: 0.1 },
    supervisedLearning: { weights: [], trainingData: [] },
    unsupervisedLearning: { clusters: [], patterns: [] },
    transferLearning: { sourceKnowledge: [], targetDomains: [] },
    metaLearning: { strategies: [], performance: [] }
  });

  const [emotionalSystem, setEmotionalSystem] = useState({
    currentEmotion: { valence: 0, arousal: 0, dominance: 0 },
    emotionalMemory: [],
    appraisal: { novelty: 0, goal_relevance: 0, coping_potential: 0 },
    motivationalState: { drives: [], goals: [], rewards: [] }
  });

  const [languageModule, setLanguageModule] = useState({
    lexicon: new Map(),
    syntacticParser: { rules: [], parseTree: null },
    semanticProcessor: { concepts: new Map(), relations: [] },
    pragmaticAnalyzer: { context: {}, intentions: [] },
    discourse: { coherence: [], reference: [] }
  });

  const [metacognitionSystem, setMetacognitionSystem] = useState({
    selfMonitoring: { accuracy: 0, confidence: 0, effort: 0 },
    strategySelection: { available: [], current: null, effectiveness: [] },
    planningModule: { goals: [], steps: [], contingencies: [] },
    reflectiveThinking: { insights: [], self_assessment: [] }
  });

  const [systemMetrics, setSystemMetrics] = useState({
    processing_speed: 0,
    memory_utilization: 0,
    attention_focus: 0,
    learning_rate: 0.01,
    emotional_stability: 0.5,
    cognitive_load: 0,
    performance_score: 0
  });

  const [globalWorkspace, setGlobalWorkspace] = useState({
    currentFocus: null,
    consciousContent: [],
    competingCoalitions: [],
    broadcastThreshold: 0.7
  });

  const processingRef = useRef(null);
  const animationRef = useRef(null);

  // ---------- Perception ----------
  const classifyInputModality = useCallback((input) => {
    if (typeof input === 'string') return 'linguistic';
    if (Array.isArray(input)) return 'spatial';
    if (typeof input === 'number') return 'quantitative';
    return 'abstract';
  }, []);

  const analyzeSentiment = useCallback((text) => {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'happy', 'love'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'sad', 'angry', 'frustrated'];
    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    for (const w of words) {
      if (positiveWords.includes(w)) score += 1;
      if (negativeWords.includes(w)) score -= 1;
    }
    return Math.max(-1, Math.min(1, score / Math.max(1, words.length)));
  }, []);

  const standardDeviation = useCallback((arr) => {
    if (!arr.length) return 0;
    const nums = arr.map(v => Number(v) || 0);
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    const variance = nums.reduce((s, v) => s + (v - mean) ** 2, 0) / nums.length;
    return Math.sqrt(variance); // change to `return variance` if you truly want variance
  }, []);

  const extractPerceptualFeatures = useCallback((input) => {
    const features = [];
    if (typeof input === 'string') {
      features.push({ type: 'word_count', value: input.trim().split(/\s+/).filter(Boolean).length });
      features.push({ type: 'sentiment', value: analyzeSentiment(input) });
      features.push({ type: 'complexity', value: input.length / 100 });
    } else if (Array.isArray(input)) {
      features.push({ type: 'size', value: input.length });
      features.push({ type: 'variance', value: standardDeviation(input) });
    }
    return features;
  }, [analyzeSentiment, standardDeviation]);

  const categorizeFeature = useCallback((feature) => {
    const categories = {
      word_count: 'linguistic',
      sentiment: 'emotional',
      complexity: 'cognitive',
      size: 'quantitative',
      variance: 'statistical'
    };
    return categories[feature.type] || 'unknown';
  }, []);

  const findSimilarity = useCallback((feature, detectors) => {
    if (!detectors.length) return 0;
    let max = 0;
    for (const d of detectors) {
      if (d.type === feature.type) {
        max = Math.max(max, 1 - Math.abs((d.value ?? 0) - (feature.value ?? 0)));
      }
    }
    return max;
  }, []);

  const calculateSalience = useCallback((feature, detectors) => {
    const novelty = 1 - findSimilarity(feature, detectors);
    const intensity = Math.abs(Number(feature.value) || 0);
    return (novelty * 0.6 + intensity * 0.4);
  }, [findSimilarity]);

  const calculateGoalRelevance = useCallback((feature, goals) => {
    if (!goals.length) return 0.3; // default baseline
    return goals.reduce((rel, goal) => {
      const hitsType = goal.type === feature.type;
      const hitsKW = goal.keywords?.some(k => feature.type.includes(k));
      return Math.max(rel, (hitsType || hitsKW) ? (goal.priority ?? 0.5) * 0.8 : 0);
    }, 0);
  }, []);

  const applyAttentionFilter = useCallback((features, goals, detectors) => {
    return features.filter(f => {
      const g = calculateGoalRelevance(f, goals);
      const s = calculateSalience(f, detectors);
      return (g + s) > 0.5;
    });
  }, [calculateGoalRelevance, calculateSalience]);

  const performObjectRecognition = useCallback((features) => {
    return features.map(f => ({
      ...f,
      confidence: Math.random() * 0.5 + 0.5,
      category: categorizeFeature(f)
    }));
  }, [categorizeFeature]);

  const processPerceptualInput = useCallback((input) => {
    const timestamp = Date.now();
    const sensoryData = {
      id: timestamp,
      data: input,
      modality: classifyInputModality(input),
      timestamp,
      decay: 1.0
    };

    // Update perception (buffer capped)
    setPerceptionModule(prev => {
      const sensoryBuffer = [...prev.sensoryBuffer.slice(-(MAX_BUF - 1)), sensoryData];
      return { ...prev, sensoryBuffer };
    });

    // Extract → attend → recognize
    const features = extractPerceptualFeatures(input);
    const goals = executiveControl.goalStack;
    const detectors = perceptionModule.featureDetectors;
    const attended = applyAttentionFilter(features, goals, detectors);
    const recognized = performObjectRecognition(attended);

    if (attended.length > 0) {
      setMemorySystem(prev => {
        const shortTermMemory = [
          ...prev.shortTermMemory.slice(-(MAX_STM - 1)),
          { id: timestamp, content: recognized, source: 'perception', strength: 1.0, timestamp }
        ];
        return { ...prev, shortTermMemory };
      });
    }

    return recognized;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classifyInputModality, extractPerceptualFeatures, applyAttentionFilter, performObjectRecognition, executiveControl.goalStack, perceptionModule.featureDetectors]);

  // ---------- Memory ----------
  const extractConcepts = useCallback((text) => {
    return text.toLowerCase()
      .split(/\s+/)
      .filter(w => w.length > 3 && !['the','and','but','for','are','with','they','this','that'].includes(w));
  }, []);

  const findSemanticMatches = useCallback((content, semanticMemory) => {
    const matches = [];
    semanticMemory.forEach((_v, k) => {
      if (typeof content === 'string' && content.toLowerCase().includes(k.toLowerCase())) {
        matches.push(k);
      }
    });
    return matches;
  }, []);

  const updateSemanticMemory = useCallback((semanticMemory, memory) => {
    const newSem = new Map(semanticMemory);
    if (typeof memory.content === 'string') {
      const concepts = extractConcepts(memory.content);
      for (const c of concepts) {
        const existing = newSem.get(c) || { count: 0, associations: [] };
        newSem.set(c, { count: existing.count + 1, associations: [...existing.associations, memory.id] });
      }
    }
    return newSem;
  }, [extractConcepts]);

  const consolidateMemories = useCallback(() => {
    setMemorySystem(prev => {
      const significant = prev.shortTermMemory.filter(m =>
        m.strength > 0.7 ||
        Math.abs(emotionalSystem.currentEmotion.valence) > 0.6 ||
        emotionalSystem.currentEmotion.arousal > 0.6 ||
        (executiveControl.goalStack.some(g => calculateGoalRelevance(m, [g]) > 0.5))
      );

      if (!significant.length && prev.shortTermMemory.length === 0) return prev;

      // Build new LTM entries & updated semantic memory once
      const now = Date.now();
      const newLTMs = significant.map(m => ({
        ...m,
        consolidated: true,
        consolidationTime: now,
        retrievalCount: 0,
        associatedConcepts: [] // could be filled with temporal/semantic passes
      }));

      // Semantic pass (single map mutation)
      let sem = new Map(prev.semanticMemory);
      for (const l of newLTMs) {
        sem = updateSemanticMemory(sem, l);
      }

      // Decay STM
      const decayedSTM = prev.shortTermMemory
        .map(m => ({ ...m, strength: m.strength * 0.9 }))
        .filter(m => m.strength > 0.1);

      const longTermMemory = [...prev.longTermMemory, ...newLTMs].slice(-500); // cap

      return {
        ...prev,
        longTermMemory,
        semanticMemory: sem,
        shortTermMemory: decayedSTM
      };
    });
  }, [emotionalSystem.currentEmotion, executiveControl.goalStack, calculateGoalRelevance, updateSemanticMemory]);

  // ---------- Executive Control ----------
  const calculateCognitiveLoad = useCallback(() => {
    const wm = memorySystem.workingMemory.length / MAX_STM;
    const attn = perceptionModule.sensoryBuffer.length / MAX_BUF;
    const reason = reasoningEngine.deductiveChains.length / 10;
    return (wm + attn + reason) / 3;
  }, [memorySystem.workingMemory.length, perceptionModule.sensoryBuffer.length, reasoningEngine.deductiveChains.length]);

  const areGoalsConflicting = useCallback((g1, g2) => {
    const pairs = [['approach','avoid'], ['speed','accuracy'], ['explore','exploit']];
    return pairs.some(([a,b]) => (g1.type === a && g2.type === b) || (g1.type === b && g2.type === a));
  }, []);

  const calculateConflictSeverity = useCallback((g1, g2) => {
    return Math.abs((g1.priority || 0) - (g2.priority || 0)) + (g1.urgency || 0) + (g2.urgency || 0);
  }, []);

  const getActiveResponses = useCallback(() => {
    return reasoningEngine.deductiveChains
      .filter(chain => (chain.confidence || 0) > 0.6)
      .map(chain => ({ type: 'reasoning', content: chain }));
  }, [reasoningEngine.deductiveChains]);

  const detectCognitiveConflicts = useCallback(() => {
    const conflicts = [];
    const goals = executiveControl.goalStack;

    for (let i = 0; i < goals.length; i++) {
      for (let j = i + 1; j < goals.length; j++) {
        if (areGoalsConflicting(goals[i], goals[j])) {
          conflicts.push({
            type: 'goal_conflict',
            goals: [goals[i], goals[j]],
            severity: calculateConflictSeverity(goals[i], goals[j])
          });
        }
      }
    }

    const active = getActiveResponses();
    if (active.length > 1) {
      conflicts.push({ type: 'response_conflict', responses: active, severity: active.length / 5 });
    }
    return conflicts;
  }, [executiveControl.goalStack, areGoalsConflicting, calculateConflictSeverity, getActiveResponses]);

  const adaptInhibitionLevel = useCallback((conflicts, load) => {
    let inhibition = 0.5;
    inhibition += conflicts.length * 0.1;
    inhibition += load * 0.3;
    return Math.max(0, Math.min(1, inhibition));
  }, []);

  const manageExecutiveControl = useCallback(() => {
    const currentLoad = calculateCognitiveLoad();
    const conflicts = detectCognitiveConflicts(); // ✅ fixed name
    const newInhibition = adaptInhibitionLevel(conflicts, currentLoad);
    setExecutiveControl(prev => ({
      ...prev,
      cognitiveLoad: currentLoad,
      conflictMonitor: { conflicts },
      inhibitionLevel: newInhibition
    }));
  }, [calculateCognitiveLoad, detectCognitiveConflicts, adaptInhibitionLevel]);

  // ---------- Working Memory ----------
  const updateWorkingMemory = useCallback((newItem) => {
    setMemorySystem(prev => {
      const wm = [...prev.workingMemory];
      if (wm.length >= MAX_STM) wm.shift(); // LRU-ish
      wm.push({ ...newItem, entryTime: Date.now(), activationLevel: 1.0 });
      return { ...prev, workingMemory: wm };
    });
  }, []);

  // ---------- Reasoning (stubs kept; tightened state caps) ----------
  const extractRules = useCallback(() => {
    const rules = [];
    memorySystem.semanticMemory.forEach((value, key) => {
      if (value.count > 2) {
        rules.push({
          type: 'frequency_rule',
          premises: [key],
          conclusion: `${key} is significant`,
          confidence: Math.min(1, value.count / 10)
        });
      }
    });
    return rules;
  }, [memorySystem.semanticMemory]);

  const extractFacts = useCallback(() => {
    return memorySystem.longTermMemory
      .filter(m => m.consolidated)
      .map(m => ({ content: m.content, confidence: m.strength || 0.5 }));
  }, [memorySystem.longTermMemory]);

  const canApplyRule = useCallback((rule, facts) => {
    return rule.premises.some(p =>
      facts.some(f => typeof f.content === 'string' && f.content.toLowerCase().includes(p.toLowerCase()))
    );
  }, []);

  const applyRule = useCallback((rule) => rule.conclusion, []);

  const performDeductiveReasoning = useCallback((_query, _context) => {
    const rules = extractRules();
    const facts = extractFacts();
    const chains = [];
    for (const r of rules) {
      if (canApplyRule(r, facts)) {
        chains.push({ premises: r.premises, conclusion: applyRule(r), rule: r, confidence: r.confidence * 0.9 });
      }
    }
    return chains;
  }, [extractRules, extractFacts, canApplyRule, applyRule]);

  const performAnalogicalReasoning = useCallback((query) => {
    const sim = (a, b) => {
      if (typeof a !== 'string' || typeof b !== 'string') return 0.1;
      const aw = a.toLowerCase().split(/\s+/);
      const bw = b.toLowerCase().split(/\s+/);
      const inter = aw.filter(w => bw.includes(w));
      return inter.length / Math.max(1, Math.max(aw.length, bw.length));
    };
    return memorySystem.longTermMemory
      .filter(m => sim(query, m.content) > 0.6)
      .map(m => ({ source: m, target: query, mapping: { correspondences: [], systemMappings: [], pragmaticCentrality: 0.5 }, confidence: sim(query, m.content) }));
  }, [memorySystem.longTermMemory]);

  const performCausalReasoning = useCallback(() => {
    const indicators = ['because', 'since', 'due to', 'causes', 'results in', 'leads to'];
    const hasInd = (t) => indicators.some(i => t.toLowerCase().includes(i));
    const out = [];
    for (const m of memorySystem.longTermMemory) {
      if (typeof m.content === 'string' && hasInd(m.content)) {
        out.push({
          cause: 'extracted cause (stub)',
          effect: 'extracted effect (stub)',
          strength: (m.retrievalCount || 0) * 0.1 + (m.strength || 0.5),
          confidence: m.strength || 0.5
        });
      }
    }
    return out;
  }, [memorySystem.longTermMemory]);

  const performInductiveReasoning = useCallback(() => {
    const recent = memorySystem.longTermMemory.slice(-20);
    const groups = { perceptual: [], cognitive: [], emotional: [], general: [] };
    for (const exp of recent) {
      const cat = exp.source === 'perception' ? 'perceptual'
        : exp.source === 'reasoning' ? 'cognitive'
        : exp.emotionallySignificant ? 'emotional'
        : 'general';
      groups[cat].push(exp);
    }
    const patterns = [];
    for (const [category, exps] of Object.entries(groups)) {
      if (exps.length > 2) {
        const features = {};
        for (const e of exps) {
          if (typeof e.content === 'string') {
            for (const w of e.content.toLowerCase().split(/\s+/)) {
              features[w] = (features[w] || 0) + 1;
            }
          }
        }
        const common = Object.entries(features)
          .filter(([_, c]) => c > exps.length / 2)
          .map(([feature, frequency]) => ({ feature, frequency }));
        patterns.push({ category, pattern: { features: common, frequency: exps.length, trend: 'stable' }, support: exps.length, confidence: Math.min(1, exps.length / 10) });
      }
    }
    return patterns;
  }, [memorySystem.longTermMemory]);

  const performAbductiveReasoning = useCallback((query, context) => {
    const observations = [];
    if (typeof query === 'string') observations.push({ type: 'linguistic', content: query });
    if (context && context.length) observations.push({ type: 'contextual', content: context });
    const causalPatterns = reasoningEngine.causalReasoning;
    const possibleCauses = new Set(['unknown environmental factor', 'system state change', 'emergent interaction']);
    for (const obs of observations) {
      for (const pat of causalPatterns) {
        if (typeof obs.content === 'string' && typeof pat.effect === 'string') {
          const o = obs.content.toLowerCase(); const e = pat.effect.toLowerCase();
          if (o.includes(e) || e.includes(o)) possibleCauses.add(pat.cause);
        }
      }
    }
    const items = [...possibleCauses].map(cause => {
      const memSupport = memorySystem.semanticMemory.get(cause)?.count || 1;
      const coherence = 0.5; // stub
      const plausibility = (Math.log(memSupport + 1) * 0.3 + coherence * 0.7) / 2;
      const testability = (typeof cause === 'string' && (cause.includes('unknown') || cause.includes('emergent'))) ? 0.3 : 0.7;
      return { explanation: cause, observations, plausibility, testability };
    });
    return items.sort((a, b) => b.plausibility - a.plausibility);
  }, [reasoningEngine.causalReasoning, memorySystem.semanticMemory]);

  const performReasoning = useCallback((query, context) => {
    const analogical = performAnalogicalReasoning(query, context);
    const causal = performCausalReasoning(query, context);
    const deductive = performDeductiveReasoning(query, context);
    const inductive = performInductiveReasoning(query, context);
    const abductive = performAbductiveReasoning(query, context);

    setReasoningEngine(prev => ({
      ...prev,
      analogicalReasoning: [...prev.analogicalReasoning, ...analogical].slice(-MAX_HISTORY),
      causalReasoning: [...prev.causalReasoning, ...causal].slice(-MAX_HISTORY),
      deductiveChains: [...prev.deductiveChains, ...deductive].slice(-MAX_HISTORY),
      inductivePatterns: [...prev.inductivePatterns, ...inductive].slice(-MAX_HISTORY),
      abductiveHypotheses: [...prev.abductiveHypotheses, ...abductive].slice(-MAX_HISTORY)
    }));

    return { analogical, causal, deductive, inductive, abductive };
  }, [performAnalogicalReasoning, performCausalReasoning, performDeductiveReasoning, performInductiveReasoning, performAbductiveReasoning]);

  // ---------- Learning ----------
  const updateReinforcementLearning = useCallback((experience, outcome) => {
    const state = JSON.stringify(experience);
    const reward = outcome?.reward || 0;
    setLearningSystem(prev => {
      const qTable = new Map(prev.reinforcementLearning.qTable);
      const currentQ = qTable.get(state) || 0;
      const alpha = 0.1;
      const newQ = currentQ + alpha * (reward - currentQ);
      qTable.set(state, newQ);
      return { ...prev, reinforcementLearning: { ...prev.reinforcementLearning, qTable } };
    });
  }, []);

  const updateSupervisedLearning = useCallback((experience, label) => {
    setLearningSystem(prev => ({
      ...prev,
      supervisedLearning: {
        ...prev.supervisedLearning,
        trainingData: [...prev.supervisedLearning.trainingData.slice(-99), { input: experience, output: label, timestamp: Date.now() }]
      }
    }));
  }, []);

  const updateUnsupervisedLearning = useCallback((experience) => {
    const features = extractPerceptualFeatures(experience);
    setLearningSystem(prev => ({
      ...prev,
      unsupervisedLearning: {
        ...prev.unsupervisedLearning,
        patterns: [...prev.unsupervisedLearning.patterns.slice(-99), { features, timestamp: Date.now() }]
      }
    }));
  }, [extractPerceptualFeatures]);

  const updateMetaLearning = useCallback((experience, outcome) => {
    setLearningSystem(prev => ({
      ...prev,
      metaLearning: {
        ...prev.metaLearning,
        performance: [...prev.metaLearning.performance.slice(-49), { experience, outcome, timestamp: Date.now() }]
      }
    }));
  }, []);

  const updateLearning = useCallback((experience, outcome = {}) => {
    updateReinforcementLearning(experience, outcome);
    if (outcome.label) updateSupervisedLearning(experience, outcome.label);
    updateUnsupervisedLearning(experience);
    updateMetaLearning(experience, outcome);
  }, [updateReinforcementLearning, updateSupervisedLearning, updateUnsupervisedLearning, updateMetaLearning]);

  // ---------- Background ticks ----------
  useEffect(() => {
    const id = setInterval(() => {
      consolidateMemories();
      manageExecutiveControl();
      setSystemMetrics(prev => ({
        ...prev,
        cognitive_load: executiveControl.cognitiveLoad,
        memory_utilization: memorySystem.workingMemory.length / MAX_STM,
        attention_focus: perceptionModule.sensoryBuffer.length / MAX_BUF
      }));
    }, 800);
    return () => clearInterval(id);
  }, [consolidateMemories, manageExecutiveControl, executiveControl.cognitiveLoad, memorySystem.workingMemory.length, perceptionModule.sensoryBuffer.length]);

  // Example usage: feed a string every few seconds (remove in prod)
  useEffect(() => {
    const demo = setInterval(() => {
      processPerceptualInput(`hello world because reasons ${Math.random().toString(36).slice(2,7)}`);
    }, 2000);
    return () => clearInterval(demo);
  }, [processPerceptualInput]);

  return (
    <div className="p-4 grid gap-3">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Brain className="w-5 h-5" /> Cognitive Architecture (sandbox)
      </div>
      <div className="text-sm opacity-80">
        WM: {memorySystem.workingMemory.length}/{MAX_STM} • Buffer: {perceptionModule.sensoryBuffer.length}/{MAX_BUF} • Load: {executiveControl.cognitiveLoad.toFixed(2)}
      </div>
      <div className="text-xs opacity-60">
        Reasoning chains: {reasoningEngine.deductiveChains.length} • Hypotheses: {reasoningEngine.abductiveHypotheses.length}
      </div>
    </div>
  );
}
