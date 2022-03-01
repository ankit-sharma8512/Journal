const express = require("express");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");
const DBHandler = require("./DBHandler");

const app = express();
const PORT = 5000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const name = "mate! ";
const aboutContent = "Hello!! Thanks for visiting!";
const contactContent = "Contact Number- +91- XXXXXXXXXX";

app.get("/", function (req, res) {
    return res.render("home", { name: name });
});

app.get("/about", function (req, res) {
    return res.render("about", { content: aboutContent });
});

app.get("/contact", function (req, res) {
    return res.render("contact", { content: contactContent });
});

app.get("/compose", function (req, res) {
    return res.render("compose");
});

app.post("/compose", function (req, res) {
    const post = {
        title: req.body.postTitle,
        body: req.body.postBody
    }
    DBHandler.insertPost(post)
        .then(() => {
            res.render("prompt", { prompt: "Successfully Posted.." });
        })
        .catch(() => {
            return res.render("prompt", { prompt: "Some Error Occured.." });
        });
});

app.get("/allposts", function (req, res) {
    DBHandler.getAllPosts()
        .then((posts) => {
            return res.render("allposts", { posts: posts });
        })
        .catch(() => {
            return res.render("prompt", { prompt: "Some Error Occured.." });
        });
});

app.get("/posts/:postID", function (req, res) {
    DBHandler.getOnePost(req.params.postID).then((found) => {
        return res.render("post", { post: found[0] });
    })
        .catch(() => {
            return res.render("prompt", { prompt: "Some Error Occured.." });
        });
});

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});
