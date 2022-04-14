const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');

const { sha256 } = require("js-sha256");

// Create

router.post('/', async (req, res)=>{

    const newPost = new Post(req.body);

    try{

        try {
            const user = await User.findOne({username: newPost.username});

            if(!user)
                res.status(404).json("cannot find the user of the post")
        }
        catch(err) {
            res.status(300).json(err);
        }

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err) {
        res.status(300).json("Post could not be created!");
    }

})



module.exports = router;