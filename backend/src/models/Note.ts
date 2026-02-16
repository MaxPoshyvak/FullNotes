import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            default: '',
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const Note = mongoose.model('Note', noteSchema);
