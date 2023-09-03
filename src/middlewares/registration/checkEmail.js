const checkEmail = (req, res, next) => {
    const { email } = req.body;
  let checked = false;
  const emailCheck = /^\w+@\w{2,}\.[a-z]{2,3}$/gi;
  checked = emailCheck.test(email);
  if (!checked)
    return res
      .status(400)
      .send({
        message:
          "Wrong email",
      });
  return next();
};
module.exports = checkEmail;
