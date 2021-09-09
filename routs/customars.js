const {customer, validate} = require('../moduls/customarvl'),
      express = require('express'),
      router = express.Router();

router.get('/all', async (req, res) => {
    const customars = await customer
          .find()
          .sort('name')
          .select('name');

    res.send(customars);
})

router.get('/gold', async (req, res) => {
    const customars = await customer
          .find({ isGold: true })
          .sort('name')
          .select('name phone');

    res.send(customars);
})

router.get('/notgold', async (req, res) => {
    const customars = await customer
          .find({ isGold: false })
          .sort('name')
          .select('name');

    res.send(customars);
})

router.post('/newone', async (req, res) => {
    const {error} =  validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const newCustomar = await new customer(req.body),
          result = await newCustomar.save();
    res.send(result);
})

router.put('/:id', async (req, res) => {
    const { error } =  validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
try{
    const theOne = await customer.findByIdAndUpdate(req.params.id, 
       {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    },{ new: true });
    if(!theOne) return res.status(404).send(' the customar with the Given id is not found');
    res.send(theOne);
}
catch(er){
    console.log(er);
}

    
})

// router.delete('/dl/:id', async (req, res) => {
    
// })










   module.exports = router;

