import mongoose from 'mongoose';
const namedSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100, unique: true },
  voiceName: { type: String, trim: true, maxlength: 100, default: '' },
}, { timestamps: true });
export const Labour = mongoose.model('LedgerLabour', namedSchema);
export const Site = mongoose.model('LedgerSite', namedSchema.clone());
const entrySchema = new mongoose.Schema({
  site: { type: mongoose.Schema.Types.ObjectId, ref: 'LedgerSite', required: true },
  labour: { type: mongoose.Schema.Types.ObjectId, ref: 'LedgerLabour', default: null },
  date: { type: String, required: true },
  amount: { type: Number, required: true, min: 0.01, max: 1000000000 },
  category: { type: String, enum: ['labour', 'material', 'transport', 'fuel', 'food', 'other'], required: true },
  clientRequestId: { type: String, maxlength: 100 },
  note: { type: String, trim: true, maxlength: 1000, default: '' },
}, { timestamps: true });
entrySchema.index({ clientRequestId: 1 }, { unique: true, sparse: true });
entrySchema.index({ date: -1, site: 1 });
export const Entry = mongoose.model('LedgerEntry', entrySchema);
