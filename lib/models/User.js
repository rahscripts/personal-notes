import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new mongoose.Schema({
    email: {
        type: String, unique: true, trim: true
    }, 
    password: {
        type: String, required: true, trim: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);