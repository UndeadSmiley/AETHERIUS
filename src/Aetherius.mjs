import express from "express";

export default class Aetherius {
  constructor(cfg) {
    this.cfg = cfg;
    this.app = express();
  }
  async init() {
    this.app.get("/status", (_req, res) => {
      res.json({ ok: true });
    });
  }
  listen(port, cb) {
    this.app.listen(port, cb);
  }
}
