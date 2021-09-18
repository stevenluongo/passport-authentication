import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    githubId: {
        type: String
    },
    hash: {
        type: String,
    },
    salt: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;