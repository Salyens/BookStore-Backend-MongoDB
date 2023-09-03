const checkPassword = (req, res, next) => {
    const { password } = req.body;
  let checked = false;
  const passwordCheck = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])([A-Za-z0-9!@#$%^&*]{8,})$/;
  checked = passwordCheck.test(password);

  if (!checked)
    return res
      .status(400)
      .send({
        message:
        "Password must contain: at least 1 capital letter, 1 number and 1 special character. Also the password length has to be at least 8 characters.",
      });
  return next();
};
module.exports = checkPassword;
