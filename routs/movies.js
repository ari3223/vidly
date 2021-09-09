const {movie, validate} = require('../moduls/movievl'),
      {Gener}           = require('../moduls/genervl'),
      auth = require('../middleware/auth.js'),
      asnc = require('../middleware/async.js'),
      express = require('express'),
      router = express.Router();

      
      router.get('/', asnc(async (req, res) => {
          
            const movies = await  movie
            .find()
            .sort("name");

            res.send(movies);
    }));
    router.get('/:name', async (req, res) => {
        const movies = await  movie
             .find({ title: req.params.name });
        res.send(movies)
    });
    router.post('/addnew', auth,async (req, res) => {
        const {error} = validate(req.body)
        if(error) return res.status(400).res.send(error.details[0].message);

        const gener = await Gener.find({ _id: req.body.generId});
        if(!gener) return res.status(404).send('genre not found...');
        console.log(gener[0].main);

        const  newone = new movie({
            title: req.body.title,
            genre: {
                _id: gener[0]._id,
                main: gener[0].main
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });

        const result = await newone.save();
        res.send(result)
    })
    router.put('/:id', async (req, res) => {  
        const {error} = validate(req.body);
        if(error) return res.status(400).send('noooooo....');

        const gener = await Gener.find({ _id: req.body.generId});
        if(!gener) return res.status(404).send('gener not found');

        const updMovie = await movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: {
                _id: gener[0]._id,
                main: gener[0].main
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });

        if(!updMovie) return res.status(404).send('movie with the given id, not find');
        const savedMovie = await updMovie.save();
        res.send(savedMovie);



    });
    router.delete('/delete/:id', async (req, res) => {
       const wantedMovie = await  movie.findByIdAndRemove(req.params.id);
       if(!wantedMovie) return res.status(404).send('movie not find')

       res.send('movie has been deleted');
    })
    
    module.exports = router;