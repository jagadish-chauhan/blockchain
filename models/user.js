import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    profileId: {
        type: String,
    },
    address: {
        type: String
    },
    chainId: {
        type: String
    },
    domain: {
        type: String
    },
    metamask_id: {
        type: String
    },
    nonce: {
        type: String
    },
    uri: {
        type: String
    },
    version: {
        type: String
    },
    about_me: {
        type: String,
        default: "This is my Bio",
    },
    posts: [{
        ref: 'posts',
        type: mongoose.Schema.Types.ObjectId
    }],
}, {
    timestamps: true,
    // strict: false
});

let Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;