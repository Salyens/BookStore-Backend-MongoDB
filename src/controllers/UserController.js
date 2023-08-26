const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateToken } = require("../utils/securiry");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser)
    return res.status(401).send({ message: "Invalid credentials" });

  const passwordMatch = bcrypt.compare(password, foundUser.password);
  if (!passwordMatch)
    return res.status(401).send({ message: "Invalid credentials" });

    const accessToken = generateToken({email:foundUser.email, _id:foundUser._id, role: foundUser.role}, '1h');
    const refreshToken = generateToken({email:foundUser.email, _id:foundUser._id, role: foundUser.role}, '30d');
    return res.send({accessToken, refreshToken})
};
