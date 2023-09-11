const { validName, validEmail, validPassword } = require('@utils/validations');

const updateProfile = (req, res, next) => {
    const errors = [];
    if(req.body.hasOwnProperty('email') && !validEmail(req.body.email)) errors.push('Invalid email');
    if(req.body.hasOwnProperty('name') && !validName(req.body.name)) errors.push('Invalid name');
    if(req.body.hasOwnProperty('password') && !validPassword(req.body.password)) errors.push('Invalid password');
    if(errors.length) return res.status(422).send({message: errors});
    return next();
}
module.exports = updateProfile;