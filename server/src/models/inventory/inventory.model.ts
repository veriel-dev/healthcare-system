import mongoose, { Schema } from 'mongoose';
import { IInventory } from '../../types/models';

const inventorySchema = new Schema<IInventory>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    minimumStock: Number,
    location: String,
    supplier: {
      name: String,
      contact: String,
      email: String,
    },
    cost: Number,
    expirationDate: Date,
    status: { type: String, required: true, default: 'available' },
  },
  { timestamps: true },
);

inventorySchema.index({ name: 1 });
inventorySchema.index({ type: 1, category: 1 });
inventorySchema.index({ expirationDate: 1 });
inventorySchema.index({ status: 1 });
inventorySchema.index({ quantity: 1 });

export const Inventory = mongoose.model<IInventory>('Inventory', inventorySchema);
