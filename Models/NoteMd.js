import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A note must have a title"],
        trim: true
    },
    content: {
        type: String,
        required: [true, "A note must have content"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "A note must belong to a user"]
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

export default Note;