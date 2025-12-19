import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
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