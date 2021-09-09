const { User, validate } = require('../moduls/uservl.js'),
      auth = require('../middleware/auth.js'),
      admin = require('../middleware/admin.js'),
      express = require('express'),
      router  = express.Router(),
      bcrypt  = require('bcrypt'),
      _       = require('lodash');

router.post('/', [auth, admin], async (req, res) => {
    const user = await User.findById(req.body.id).select('-password');
    res.send(user);
});

router.post('/add', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const newUser = await new User( _.pick(req.body, ['name', 'email', 'password', 'isadmin']) );
    const salt    = await bcrypt.genSalt(5);
    newUser.password  = await bcrypt.hash(newUser.password, salt);

    await newUser.save();
    const token = newUser.generatesAuthToken()
    res.header('X-auth-token', token).send(_.pick(newUser, ['name', 'email']));
});

module.exports = router;
