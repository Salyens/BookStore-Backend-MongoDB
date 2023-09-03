const checkName = (req, res, next) => {
    const { name } = req.body;
  let checked = false;
  const nameCheck = /^[a-z]+ [a-z]+$/gi;
  checked = nameCheck.test(name);

  if (!checked)
    return res
      .status(400)
      .send({
        message:
          "Name must contain first name and second name. Only letters.",
      });
  return next();
};
module.exports = checkName;
