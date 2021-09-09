const express = require('express');
const router  = express.Router();
const {valid, Gener} = require('../moduls/genervl.js');

router.get('/', async (req, res) => {
    const gners = await  Gener
         .find()
         .select('main subset');

    res.send(gners)
});
router.get('/subset/:name', async (req, res) => {
    const gener = await  Gener
         .find({ main: req.params.name })
         .select('subset');

    res.send(gener)
});
router.post('/addnew', async (req, res) => {
    const {error} = valid(req.body);
    if(error) return res.status(400).send(error.message);

    const newgener = await new Gener(req.body);
    res.send(await newgener.save());
})
router.put('/:id', async (req, res) => {  
    const { error } = valid(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const up = await Gener.findByIdAndUpdate(req.params.id, {main: req.body.main}, {new: true});
    if(!up) return res.status(404).send('The genre with the given ID was not found.');
    res.send(up);
});
router.delete('/delete/:id', async (req, res) => {
   const result = await Gener.findByIdAndRemove(req.params.id);
   if(!result) return res.status(400).send('gener with the given id is not exict...')
   res.send(result);
})

module.exports = router;



