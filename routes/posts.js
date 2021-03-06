const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');

const { sha256 } = require("js-sha256");

// Create

router.post('/', async (req, res) => {

    const newPost = new Post(req.body);

    try {

        try {
            const user = await User.findOne({ username: newPost.username });

            if (!user)
                res.status(404).json("cannot find the user of the post")
        }
        catch (err) {
            res.status(300).json(err);
        }

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch (err) {
        res.status(300).json("Post could not be created!");
    }

})

// Update

router.put('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if (!post)
            res.status(404).json("Post does not exist");

        try {
            if (post.username === req.body.username) {
                const user = await Post.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                )

                res.status(200).json(user);
            }
            else {
                res.status(401).json("You can only update your own post");
            }
        }
        catch (err) {
            res.status(300).json(err);
        }

    }

    catch (err) {
        res.status(500).json(err);
    }

})

// Delete

router.delete('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if (!post)
            res.status(404).json("Post does not exist");

        try {
            console.log("username: ", post.username);
            console.log("username: ", req.body.username);
            if (post.username === req.body.username) {
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json("Post deleted successfully!");
            }
            else {
                res.status(401).json("You can only delete your own post");
            }
        }
        catch (err) {
            res.status(300).json(err);
        }

    }

    catch (err) {
        res.status(500).json(err);
    }

})


// get post by id

router.get('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if (!post)
            res.status(404).json("Post does not exist");

        else
            res.status(200).json(post);
    }
    catch (err) {
        res.status(400).json(err);
    }

})

//get posts query

router.get('/', async (req, res) => {

    const username = req.query.username;
    const category = req.query.category;

    try {
        let posts;
        if(username) {
            posts = await Post.find({username: username});
        }

        else if(category) {
            posts = await Post.find({categories: {
                $in: [category]
            }})
        }

        else {
            posts = await Post.find({});
        }

        if(!posts)
            res.status(404).json("post do not exist");
        else
            res.status(200).json(posts);

    }

    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

module.exports = router;