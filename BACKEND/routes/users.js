const router = require("express").Router();
const User = require("../moda/models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
//UPDATE USER
router.delete("/:id", verify, async (req, res) => {
  console.log("req.user", req.user.id, req.params.id);
  console.log("admin", req.user.isAdmin);

  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      await User.findByIdAndDelete(
        req.params.id,
        {
          $set: updateUser,
        },
        { new: true }
      );
      console.log("update user", upateUser);
      res.status(200).json(upateUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//DELETE USER
router.put("/:id", verify, async (req, res) => {
  console.log("req.user", req.user.id, req.params.id);
  console.log("admin", req.user.isAdmin);

  try {
    if (req.user.id === req.params.id) {
      if (req.body.password) {
        await User.findByIdAndUpdate(req.params.id);

        res.status(200).json("User has been deleted");
      }
    } else {
      res.status(500).json("You can delete only your account");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET USER
//GET ALL USER
//GET USER STATUS

module.exports = router;
