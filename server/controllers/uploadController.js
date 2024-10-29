const cloudinary = require("cloudinary").v2;
const Jimp = require("jimp");
const User = require("../models/User");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = async (req, res) => {
  try {
    //get base64 image and user form req.body
    const { avatar, user } = req.body;
    let buffer;
    fs.readFile(avatar, (err, data) => {
      buffer = new Buffer(data).toString("base64");
    });
    const image = await Jimp.read(buffer);
    let imageUrl;
    cloudinary.uploader.upload(image).then((result) => {
      imageUrl: result.secure_url;
    });
    const dbUser = User.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });
    dbUser.updateOne({
      imageUrl: imageUrl,
    });
    dbUser.save();
    res.sattus(200).json({ message: "Image Uploaded Succesfully" });
  } catch (error) {
    console.log("Error uplaoding Image");
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { uploadImage };
