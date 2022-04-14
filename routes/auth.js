const router = require('express').Router();
const User = require('../models/user');
const { sha256 } = require('js-sha256');

// Register
router.post("/register", async (req, res) => {

    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: sha256(req.body.password),
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// LOGIN

router.post('/login', async (req, res) => {

    User.findOne({ username: req.body.username }, (err, user) => {
        if (!user) {
            res.status(500).json("User doesnot exist!");
            return;
        }

        if (user.password == sha256(req.body.password)) {
            res.status(200).json(user);
            return;
        }

        else {
            res.status(500).json("Wrong Password!");
            return;
        }
    })

})

module.exports = router;