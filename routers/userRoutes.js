const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// To create an user 
router.post("/createAccount", userController.createAccount);
// To get all the user
router.get("/getAllUser", userController.getAllUser);
// To find user by Id
router.get("/findById/:id", userController.findById);
// delete user Based on there Id
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
