import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/adminAuthMiddleware.js';
import { Labour, Site, Entry } from '../models/Ledger.js';
const router = express.Router();
router.use(auth);
const validId = value => typeof value === 'string' && mongoose.isValidObjectId(value);
router.get('/names', async (req, res) => {
  const [labours, sites] = await Promise.all([Labour.find().sort({ name: 1 }), Site.find().sort({ name: 1 })]);
  res.json({ labours, sites });
});
router.post('/names/:kind', async (req, res) => {
  const Model = { labours: Labour, sites: Site }[req.params.kind];
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  if (!Model || !name || name.length > 100) return res.status(400).json({ message: 'Enter a name (1–100 characters).' });
  try { res.status(201).json(await Model.create({ name })); }
  catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'This name already exists / یہ نام پہلے موجود ہے' });
    throw error;
  }
});
router.patch('/names/:kind/:id', async (req, res) => {
  const Model = { labours: Labour, sites: Site }[req.params.kind];
  if (!Model || !validId(req.params.id) || typeof req.body.voiceName !== 'string' || req.body.voiceName.length > 100) return res.status(400).json({ message: 'Invalid voice name' });
  const item = await Model.findByIdAndUpdate(req.params.id, { voiceName: req.body.voiceName.trim() }, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: 'Name not found' });
  res.json(item);
});
router.get('/entries', async (req, res) => {
  res.json(await Entry.find().populate('site labour', 'name').sort({ date: -1, createdAt: -1 }).lean());
});
function validate(body) {
  if (!validId(body.site) || (body.labour && !validId(body.labour))) return false;
  if (!['labour', 'material', 'transport', 'fuel', 'food', 'other'].includes(body.category)) return false;
  if (body.category === 'labour' && !body.labour) return false;
  if (typeof body.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) return false;
  const date = new Date(body.date + 'T00:00:00Z');
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== body.date) return false;
  if (!['number', 'string'].includes(typeof body.amount) || !Number.isFinite(Number(body.amount)) || Number(body.amount) <= 0 || Number(body.amount) > 1e9) return false;
  return body.note === undefined || (typeof body.note === 'string' && body.note.length <= 1000);
}
async function save(req, res) {
  const requestId = req.body.clientRequestId;
  if (requestId !== undefined && (typeof requestId !== 'string' || !/^[a-zA-Z0-9-]{1,100}$/.test(requestId))) return res.status(400).json({ message: 'Invalid request ID' });
  if (!req.params.id && requestId) {
    const existing = await Entry.findOne({ clientRequestId: requestId }).populate('site labour', 'name');
    if (existing) {
      const same = String(existing.site?._id || existing.site) === req.body.site && String(existing.labour?._id || existing.labour || '') === (req.body.labour || '') && existing.date === req.body.date && existing.amount === Math.round(Number(req.body.amount) * 100) / 100 && existing.category === req.body.category && existing.note === (req.body.note || '');
      if (!same) return res.status(409).json({ message: 'یہ اندراج پہلے محفوظ ہو چکا ہے۔ رپورٹ میں دیکھ کر درست کریں۔ / Entry already saved; edit it in Reports.' });
      return res.json(existing);
    }
  }
  if (!validate(req.body)) return res.status(400).json({ message: 'Check site, labour, date and amount / معلومات درست کریں' });
  if (!(await Site.exists({ _id: req.body.site })) || (req.body.labour && !(await Labour.exists({ _id: req.body.labour })))) return res.status(400).json({ message: 'Site or labour not found.' });
  const values = { site: req.body.site, labour: req.body.labour || null, date: req.body.date, amount: Math.round(Number(req.body.amount) * 100) / 100, category: req.body.category, note: req.body.note || '' };
  if (values.amount <= 0) return res.status(400).json({ message: 'Minimum amount is 0.01' });
  if (req.params.id && !validId(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
  let entry;
  try {
    entry = req.params.id ? await Entry.findByIdAndUpdate(req.params.id, values, { new: true, runValidators: true }) : await Entry.create({ ...values, ...(requestId ? { clientRequestId: requestId } : {}) });
  } catch (error) {
    if (error.code !== 11000 || !requestId || req.params.id) throw error;
    entry = await Entry.findOne({ clientRequestId: requestId });
  }
  if (!entry) return res.status(404).json({ message: 'Entry not found' });
  res.status(req.params.id ? 200 : 201).json(await entry.populate('site labour', 'name'));
}
router.post('/entries', save);
router.put('/entries/:id', save);
router.delete('/entries/:id', async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
  if (!(await Entry.findByIdAndDelete(req.params.id))) return res.status(404).json({ message: 'Entry not found' });
  res.json({ success: true });
});
export default router;
