const checkRole = (req, res, next) => {
    if(req.user.role !== "ADMIN") return res.status(400).send({message: "Access restricted"});
    return next();
}
module.exports = checkRole;