const config = require('config'),
      jwt     = require('jsonwebtoken');
module.exports = async function (req, res, next) {
    const token = await req.header('X-auth-token');
    if(!token) return res.status(401).send('Access denide, no Token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwtpaskey'));
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
       return res.status(400).send('invalid token');
    }
}