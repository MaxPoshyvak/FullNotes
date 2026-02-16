import { Schema, model } from 'mongoose';

const magicTokenSchema = new Schema(
    {
        email: { type: String, required: true },
        token: { type: String, required: true, unique: true },
        used: { type: Boolean, default: false },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

// TTL — Mongo сам видалить прострочені токени
magicTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const MagicToken = model('MagicToken', magicTokenSchema);
