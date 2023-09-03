const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateToken } = require("../utils/securiry");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser)
      return res.status(401).send({ message: "Invalid credentials" });

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch)
      return res.status(401).send({ message: "Invalid credentials" });

    await User.updateOne({ email }, { lastLogin: Date.now() });

    const accessToken = generateToken(
      { email: foundUser.email, _id: foundUser._id, role: foundUser.role },
      "1h"
    );
    const refreshToken = generateToken(
      { email: foundUser.email, _id: foundUser._id, role: foundUser.role },
      "30d"
    );
    return res.send({ accessToken, refreshToken });
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.generateTokenPairs = (req, res) => {
  try {
    const { email, _id, role } = req.user;
    const accessToken = generateToken({ email, _id, role }, "1h");
    const refreshToken = generateToken({ email, _id, role }, "30d");
    return res.send({ accessToken, refreshToken });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.registration = async (req, res) => {
  try {
    await User.create(req.body);
    const { email, _id, role } = req.body;
    const accessToken = generateToken({ email, _id, role }, "1h");
    return res.send({ accessToken });

  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something is wrong" });
  }
}
