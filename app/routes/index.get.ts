import express from 'express';

export default function index(req: express.Request, res: express.Response) {
  res.json({ weedocs: true });
}
