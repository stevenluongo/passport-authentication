import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'

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
    id: {
        type: String,
        default: uuidv4()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;