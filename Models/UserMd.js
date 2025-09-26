import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true,"User name is required"] },
    email: { type: String, },
    password: { type: String, required: [true,"Password is required"] },
    role: { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;