const router = require("express").Router();
const User = require("../moda/models/User");
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//REGISTER
router.post("/register", async (req, res) => {
  console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      res.status(401).json("Wrong authenticate");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json("Wrong password");
    } else {
      const { password, ...info } = user._doc;
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );

      res.status(200).json({ ...info, accessToken });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
module.exports = router;
