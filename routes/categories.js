const router = require('express').Router();
const Category = require('../models/category');

router.get('/', async (req, res)=>{
    try{
        const cats = await Category.find({});
        console.log(cats);
        res.status(200).json(cats);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res)=>{
    try{
        const cats = new Category({
            name: req.body.name
        })

        cats.save();
        console.log(cats);
        res.status(200).json(cats);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const cat = await Category.findByIdAndDelete(req.params.id);
        res.status(200);
    }
    catch(err){
        res.status(500).json("Cannot delete the category");
    }
})

module.exports = router;