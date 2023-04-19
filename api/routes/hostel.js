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
// router.delete("/:id",async(req,res)=>{
//   try {
//     let hostel_id = req.params.id;
//     let hostel_info = await Hostel.find({HostelID:hostel_id});
//     if(!hostel_info){
//       return res.status(400).json(message,"Bad request");
//     }
//     else{
//       hostel_info = await Hostel.deleteOne({HostelID:hostel_id});
//       res.status(204).send("hostel info deleted successfully");
//     }
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });
router.put("/",async(req,res)=>{
  try {
    console.log(req.body);
    const {PrevID,HostelID,Name,oneS,twoS,threeSAC,threeSNAC,Type} = req.body;
    const newHostel_info = {};

    if (HostelID){newHostel_info.HostelID = HostelID}
    if (Name){newHostel_info.Name = Name}
    if (oneS){newHostel_info.oneS = oneS}
    if (twoS){newHostel_info.twoS = twoS}
    if (threeSAC){newHostel_info.threeSAC = threeSAC}
    if (threeSNAC){newHostel_info.threeSNAC = threeSNAC}
    if (Type){newHostel_info.Type = Type}
    console.log(newHostel_info)
    const hostel_info = await Hostel.findOneAndUpdate({HostelID:PrevID},{$set:newHostel_info},{new:true});
      res.status(204).json({msg:"hostel info updated successfully",newHostel:hostel_info});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})
router.get("/", async (req, res) => {
  try {
    const foundHostels = await Hostel.find();
    res.status(200).json(foundHostels);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
