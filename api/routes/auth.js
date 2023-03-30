const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Hostel_Applications = require('../Models/Hostel_Applications');

// Route 1 : Creating create user endpoint :POST /api/routes/auth/createuser : no login req
router.post('/application',
[body('roll_no').isLength({ min: 10, max: 15 }),
body('name').isLength({ min: 1, max: 50 }),
body('email').isEmail(),
body('phone_no').isMobilePhone(),
// body('father_name').isLength({ min: 1, max: 50 }),
// body('father_email').isEmail(),
// body('mother_name').isLength({ min: 1, max: 50 }),
// body('mother_email').isEmail(),
// body('local_gaurdian_name').isLength({ min: 1, max: 50 }),
// body('local_gaurdian_email').isEmail(),
// body('father_phone_no').isMobilePhone(),
// body('mother_phone_no').isMobilePhone(),
// body('local_gaurdian_phone_no').isMobilePhone(),
],
async (req, res) => {
  console.log(req.body);
  try {
    // checking the req body data
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: success, errors: errors.array() });
    }
    // finding a user with same email address
    let user = await Hostel_Applications.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success: success, err: "Sorry this user already exists" });
    }
    // creating user
    user = new Hostel_Applications({
        roll_no: req.body.roll_no,
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        phone_no: req.body.phone_no,
        blood_group: req.body.blood_group,
        region: req.body.region,
        course: req.body.course,
        branch: req.body.branch,
        semester: req.body.semester,
        back_papers: req.body.back_papers,
        year_of_admission: req.body.year_of_admission,
        sgpa: req.body.sgpa,
        chronic_problems: req.body.chronic_problems,
        upload: req.body.upload,
        first_preference: req.body.first_preference,
        second_preference: req.body.second_preference,
        third_preference: req.body.third_preference,
        fourth_preference: req.body.fourth_preference,
        father_name: req.body.father_name,
        father_phone_no: req.body.father_phone_no,
        father_email: req.body.email,
        father_occupation: req.body.father_occupation,
        father_office_address: req.body.father_office_address,
        father_office_phone_no: req.body.father_office_phone_no,
        mother_name: req.body.mother_name,
        mother_phone_no: req.body.mother_phone_no,
        mother_email: req.body.mother_email,
        mother_occupation: req.body.mother_occupation,
        mother_office_address: req.body.mother_office_address,
        mother_office_phone_no: req.body.mother_office_phone_no,
        acc_no: req.body.acc_no,
        acc_holder_name: req.body.acc_holder_name,
        bank_name: req.body.bank_name,
        ifsc: req.body.ifsc,
        bank_branch: req.body.bank_branch,
        bank_address: req.body.bank_address,
        home_address: req.body.home_address,
        home_city: req.body.home_city,
        home_state: req.body.home_state,
        home_country: req.body.home_country,
        home_pincode: req.body.home_pincode,
        corr_address: req.body.corr_address,
        corr_city: req.body.corr_city,
        corr_state: req.body.corr_state,
        corr_country: req.body.corr_country,
        local_guardian_name: req.body.local_guardian_name,
        local_guardian_address: req.body.local_guardian_address,
        local_guardian_phone_no: req.body.local_guardian_phone_no,
        local_guardian_email: req.body.local_guardian_email,
        sign: req.body.sign,
        discrepancy: req.body.discrepancy,
        TandC: req.body.TandC
      }
    );
    const savedUser = await user.save()
    res.json({savedUser});
  }
  catch (error) {
    console.error(error.message, "Something went wrong");
  }
    })

module.exports = router