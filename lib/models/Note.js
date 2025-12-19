import mongoose, { mongo } from "mongoose";
import { title } from "process";

const NoteSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: String,
    content: String,
    createdAt: {type: Date, default: Date.now}
}, {
    timestamps: true
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);