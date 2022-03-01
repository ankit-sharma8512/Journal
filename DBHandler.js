const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/Journal";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
const Post = mongoose.model("Post", postSchema);

module.exports.insertPost = async function (post) {
    try {
        await mongoose.connect(DB_URL);
        const currDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const newPost = new Post({
            title: post.title,
            body: post.body,
            date: currDate.toLocaleDateString(undefined, options)
        })
        await newPost.save();
        mongoose.connection.close();
    }
    catch {
        throw new Error;
    }
}

module.exports.getAllPosts = async function () {
    try {
        await mongoose.connect(DB_URL);
        const posts = await Post.find();
        mongoose.connection.close();
        return posts;
    }
    catch {
        throw new Error;
    }
}

module.exports.getOnePost = async function (_id) {
    try {
        await mongoose.connect(DB_URL);
        const post = await Post.find({ _id: _id });
        mongoose.connection.close();
        return post;
    }
    catch {
        throw new Error;
    }
}