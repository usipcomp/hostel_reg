const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Student = require("../Models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admins = require("../Models/Admins");
// console.log(process.env.JWT_SECRET);
const JWT_SECRET = "mainhujian"

router.post(
  "/",
  [
    // Adding Valiadator
    body("roll_no", "Enter a valid roll number").exists(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // Checking for errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { roll_no, password } = req.body;
    console.log(req.body);
    try {
      let user = await Student.findOne({roll_no:roll_no});
      console.log(user)
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct credintials" });
      }

      if (user.updatedHostelPassword == "" && roll_no == password) {
        const data = {
          user: user,
        };
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ success, student: user,user_desgn:"student", authToken: authToken });
      }

      const passwordCompare = bcrypt.compareSync(
        password,
        user.updatedHostelPassword
      );
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct credintials" });
      }

      const data = {
        user: user,
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      return res.status(200).json({ success,user_desgn:"student", student: user, authToken: authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
router.post("/admin",
  [
    body("password", "Password cannot be blank").exists(),
  ],
  async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json({success:false,errors:error.array()});
    }
    const adminID = req.adminID;
    const password = req.password;
    try {
      const getAdmin = Admins.findOne({adminID:adminID});
      if(!getAdmin){
        return res.status(404).json({success:false,message:"Admin not found!"});
      }
      else if(getAdmin.password===password){
        const authToken = jwt.sign("admin444",JWT_SECRET);
        return res.status(200).json({success:true,user_desgn:"admin",authToken:authToken});
      }
      else{
        return res.status(400).json({success:false,message:"Invalid Credentials"});
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }

})
router.post(
  "/updatePassword/:id",
  [
    body("password", "Password cannot be blank").exists(),
    body("new_password", "New password cannot be blank").exists(),
    body("re_new_password", "Reenter new password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { password, new_password, re_new_password } = req.body;
    const id = req.params.id;
    try {
      if (new_password != re_new_password) {
        return res.status(401).json({
          success,
          errors: "New password and doesn't match with re-entered password",
        });
      }

      let user = Student.findById(id);
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct credintials" });
      }

      let password_check;
      if (user.updatedHostelPassword != null)
        password = bcrypt.compareSync(password, user.updatedHostelPassword);

      if (user.updatedHostelPassword != null && !password_check) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct credintials" });
      }

      const secure_password = bcrypt.hashSync(new_password, 10);
      const newUser = {};
      newUser.updatedHostelPassword = secure_password;

      let new_user = await Student.findByIdAndUpdate(
        id,
        { $set: newUser },
        { new: true }
      );
      const data = {
        user: new_user,
      };
      success = true;
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
