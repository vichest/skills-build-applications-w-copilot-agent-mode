import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const entries = await Leaderboard.find().populate('user', '-password').sort({ score: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findById(req.params.id).populate('user', '-password');
    if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json({ message: 'Leaderboard entry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
