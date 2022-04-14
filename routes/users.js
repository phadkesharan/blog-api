const router = require('express').Router();
const User = require('../models/user');
const { sha256 } = require("js-sha256");

// Register
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
            console.log(user);
            res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    }

    else {
        res.status(402).json("Cannot update other's account !");
    }

})

// Delete
router.delete('/:id', async (req, res) => {

    if (req.params.id === req.body.userId) {

        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted successfully!");
    }

    else {
        res.status(402).json("Cannot delete other's account !");
    }

})


module.exports = router;