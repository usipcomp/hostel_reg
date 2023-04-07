const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Hostel = require("../Models/Hostels");

router.post(
  "/",
  [
    body("HostelID").isLength({ min: 5, max: 30 }).notEmpty().isString(),
    body("Name").isLength({ min: 5, max: 30 }).notEmpty().isString(),
    body("Type").notEmpty().isIn(["G", "B"]),
    body("oneS").notEmpty().isInt({ min: 0 }),
    body("twoS").notEmpty().isInt({ min: 0 }),
    body("threeSAC").notEmpty().isInt({ min: 0 }),
    body("threeSNAC").notEmpty().isInt({ min: 0 }),
  ],
  async (req, res) => {
    try {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: success, errors: errors.array() });
      } else {
        const newHostel = new Hostel(req.body);
        const savedHostel = await newHostel.save();
        console.log(savedHostel);
        return res
          .status(201)
          .json({ success: true, savedHostel: savedHostel });
      }
    } catch (error) {
      res.status(500).json(error.message, "Something went wrong");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const foundHostels = await Hostel.find();
    res.status(200).json(foundHostels);
  } catch (err) {
    res.status(500).json(error.message, "Something went wrong");
  }
});

module.exports = router;
