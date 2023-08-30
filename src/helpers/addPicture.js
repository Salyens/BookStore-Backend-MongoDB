const path = require("path");
const util = require("util");
const fs = require("fs");

const addPicture = async (req, wholeBookInfo, isCreate) => {
  const { imgURL } = req.files;
  const mimeType = imgURL.mimetype.split("/")[1];
  const imageBuffer = Buffer.from(imgURL.data, "base64");

  const folderName = "upload";
  const folderPath = path.resolve(__dirname, `../${folderName}`);

  const subFolderName = "book_pictures";
  const subFolderPath = path.resolve(folderPath, subFolderName);

  const fileName = Date.now() + "." + mimeType;
  const filePath = path.resolve(subFolderPath, fileName);

  if (isCreate) {
    let folderExists = false;

    const checkExistUpload = async () => {
      fs.access(folderPath, fs.constants.F_OK, (err) => {
        if (!err) folderExists = true;
      });
    };

    const createFolders = async () => {
      fs.mkdir(folderPath, () => {});
      fs.mkdir(subFolderPath, () => {});
    };

    checkExistUpload();
    if (!folderExists) createFolders();
  }

  wholeBookInfo["imgURL"] = `/${subFolderName}/${fileName}`;
  await util.promisify(fs.writeFile)(filePath, imageBuffer);
};

module.exports = addPicture;
