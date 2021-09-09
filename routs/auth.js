const { User } = require('../moduls/uservl.js'),
      joi     = require('joi'),
      express = require('express'),
      router  = express.Router(),
      config = require('config'),
      bcrypt  = require('bcrypt'),
      _       = require('lodash'),
      jwt     = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const isPsValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPsValid) return res.status(400).send('Invalid email or  password');

    const token = jwt.sign({ _id: user.id}, config.get('jwtpaskey'));
    res.header('X-auth-token', token).send(_.pick(user, ['-id', 'name', 'email']))
});

function validate(user) {
    const usSchema = joi.object({
        email: joi.string().min(10).max(40).required(),
        password: joi.string().required()
    });
    return usSchema.validate(user);
};
module.exports = router;
