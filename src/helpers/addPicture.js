const path = require("path");

const addPicture = (picture) => {
    const fileName = Date.now() + ".jpg";
    const filePath = path.resolve("static", fileName);
    picture.mv(filePath);
 
    return fileName;
}

module.exports = addPicture;