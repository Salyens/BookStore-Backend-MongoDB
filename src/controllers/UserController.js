const bcrypt = require("bcrypt");
const { User } = require("@models");
const { generateToken } = require("@utils/securiry");

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
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.registration = async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, +process.env.SALT);
    const { email, _id, role } = req.body;
    await User.create({ ...req.body, password });

    const accessToken = generateToken({ email, _id, role }, "1h");
    return res.send({ accessToken });
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.update = async (req, res) => {
  try {
    const errors = [];
    const { email } = req.user;
    
    const foundUser = await User.findOne({ email });

    if (!foundUser) return res.status(404).send({ message: "User not found" });

    let { name: newName, email: newEmail, password: newPassword } = req.body;

    if (newPassword) {
      newPassword = bcrypt.hashSync(newPassword, +process.env.SALT);
      const passwordsMatch = await bcrypt.compare(
        foundUser.password,
        newPassword
      );
      if (passwordsMatch) errors.push("Current password matches new password");
    }

    if (newName && foundUser.name === newName)
      errors.push("Current name matches new name");

    if (newEmail && foundUser.email === newEmail)
      errors.push("Current email matches new email");

    if (errors.length) return res.status(422).send({ message: errors });

    for (const key in req.body) {
      foundUser[key] = req.body[key];
    }
    foundUser.save();

    return res.send({ message: "User was successfully updated" });
  } catch (_) {
    return res.status(422).send({ message: "Something is wrong" });
  }
};
