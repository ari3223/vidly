const config = require('config'),
      jwt     = require('jsonwebtoken');
module.exports = async function (req, res, next) {
    if(!req.user.isadmin) return res.status(403).send('Access denid');
    next();

}