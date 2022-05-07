const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');

const { sha256 } = require("js-sha256");

// Update
router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {

        if (req.body.password) {
            req.body.password = sha256(req.body.password);
        }

        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            );
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }

    }

    else {
        res.status(402).json("Cannot update other's account !");
    }

})

// Delete
router.delete('/:id', async (req, res) => {

    console.log(req.params.id, " ", req.body.userId);

    if (req.params.id === req.body.userId) {

        try {
            const user = User.findById(req.params.id);

            try {
                await Post.deleteMany({ username: user.username });
            }
            catch (err) {
                res.status(300).json("Cannot delete Posts");
            }

        }
        catch (err) {
            res.status(404).json("User not found");
        }

        try {
            await User.findByIdAndDelete(req.params.id);
        }
        catch (err) {
            res.status(404).json(err);
        }

        res.status(200).json("User deleted successfully!");
    }

    else {
        res.status(402).json("Cannot delete other's account !");
    }

})

// Get User
router.get('/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    }
    catch (err) {
        res.status(404).json(err);
    }

})


module.exports = router;