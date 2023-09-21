const { Category, Book } = require("@models");

exports.create = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.send(category);
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.send(categories);
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.update = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    
    await Category.updateOne({ _id: categoryId }, req.body);
    await Book.updateMany(
      { "category._id": categoryId },
      { $set: { "category.name": req.body.name, "category.status": req.body.status } }
    );
    
    return res.send({ message: "Category successfully updated" });
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { deletedCount } = await Category.deleteOne({ _id: req.params.id });
    if (!deletedCount)
      return res.status(404).send({ message: "Category is not found" });
    return res.send({ message: "Category successfully deleted" });
  } catch (e) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};
