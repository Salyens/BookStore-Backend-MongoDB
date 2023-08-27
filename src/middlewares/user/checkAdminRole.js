const checkRole = (req, res, next) => {
    if(req.user.role !== "ADMIN") return res.status(400).send({message: "You can't change this field"});
    return next();
}
module.exports = checkRole;