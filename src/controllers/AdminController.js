const bcrypt = require("bcrypt");
const { Admin } = require("../models");
const { generateToken } = require("../utils/securiry");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await Admin.findOne({ email });
  if (!foundUser)
    return res.status(401).send({ message: "Invalid credentials" });

  const passwordMatch = bcrypt.compare(password, foundUser.password);
  if (!passwordMatch)
    return res.status(401).send({ message: "Invalid credentials" });

    const accessToken = generateToken({email:foundUser.email, _id:foundUser._id}, '1h');
    const refreshToken = generateToken({email:foundUser.email, _id:foundUser._id}, '30d');
    return res.send({accessToken, refreshToken})
};
