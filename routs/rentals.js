const { validate, Rental } = require('../moduls/rentalvl.js'),
      { customer }         = require('../moduls/customarvl.js'),
      { movie }            = require('../moduls/movievl.js'),
      mongoose = require('mongoose'),
    //   Fawn = require('fawn'),
      express = require('express'),
      router = express.Router();
// Fawn.init(mongoose);

router.post('/add', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const thecustomar = await customer.find({ _id: req.body.cusId});
    if(!thecustomar) return res.status(404).send("customar doesn't exist");
    if(!thecustomar[0].isGold) return res.status(400).send('customar is not Gold');

    const themovie = await movie.find({ _id: req.body.movieId});
    if(!themovie) return res.status(404).send("movie doesn't exist");

   
    const rental = new Rental({
        movie: {
            _id: themovie[0]._id,
            title: themovie[0].title
        },
        customar: {
            _id: thecustomar[0]._id,
            name: thecustomar[0].name
        },
        dailyRentalRate: themovie[0].dailyRentalRate
    })
// try {
//     await new Fawn.Task()
//     .save("rental", rental)
//     .update("movies", { _id: mongoose.Types.ObjectId(req.body.movieId)}, {
//        $inc: { numberInStock: -1 }
//     })
//     .run()
//     res.send(rental)
    
// } catch (error) {
//    res.status(500).res.send('somthing went wrong')
// }
})

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-rentout');
    res.send(rentals);
})

module.exports = router;