const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Hostel = require("../Models/Hostels");
const Beds = require("../Models/Beds");
const Occupancy = require("../Models/OccupancyHistory");
const Hostel_Applications = require("../Models/Hostel_Applications");
const OpenCloseApplications = require("../Models/OpenCloseApplications");
function compDist(a, b) {
  if (a.distance < b.distance) {
    return 1;
  } else if (a.distance > b.distance) {
    return -1;
  } else {
    return 0;
  }
}
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
router.put("/", async (req, res) => {
  try {
    console.log(req.body);
    const { PrevID, HostelID, Name, oneS, twoS, threeSAC, threeSNAC, Type } =
      req.body;
    const newHostel_info = {};

    if (HostelID) {
      newHostel_info.HostelID = HostelID;
    }
    if (Name) {
      newHostel_info.Name = Name;
    }
    if (oneS) {
      newHostel_info.oneS = oneS;
    }
    if (twoS) {
      newHostel_info.twoS = twoS;
    }
    if (threeSAC) {
      newHostel_info.threeSAC = threeSAC;
    }
    if (threeSNAC) {
      newHostel_info.threeSNAC = threeSNAC;
    }
    if (Type) {
      newHostel_info.Type = Type;
    }
    console.log(newHostel_info);
    const hostel_info = await Hostel.findOneAndUpdate(
      { HostelID: PrevID },
      { $set: newHostel_info },
      { new: true }
    );
    res.status(204).json({
      msg: "hostel info updated successfully",
      newHostel: hostel_info,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
router.get("/", async (req, res) => {
  try {
    const foundHostels = await Hostel.find();
    res.status(200).json(foundHostels);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
// allotment algorithm
router.post("/allocate", async (req, res) => {
  const { applications, from, to, admn_year } = req.body;

  let outsideDelhi = [];
  let delhi = [];
  let mix = [];

  for (let i = 0; i < applications.length; i++) {
    if (applications[i].year_of_admission == admn_year) {
      if (applications[i].region == "Outside Delhi") {
        outsideDelhi.push(applications[i]);
      } else if (applications[i].region == "Delhi") {
        delhi.push(applications[i]);
      } else {
        mix.push(applications[i]);
      }
    }
  }

  //PRIORITY - 1 (Outside Delhi)
  let outsideDelhiPWD = [];

  //Segregating on the basis of outside delhi and PWD

  for (let i = 0; i < outsideDelhi.length; i++) {
    if (outsideDelhi[i].PWD) {
      outsideDelhiPWD.push(outsideDelhi[i]);
      outsideDelhi.splice(1, i);
    }
  }

  //Sorting both (outside delhi and PWD with outside delhi) according to distance
  //distance to be entered in the form by the applicant

  outsideDelhiPWD.sort(compDist);
  outsideDelhi.sort(compDist);

  //PRIORITY 2 - Outisde Delhi but schooling from delhi

  //Segregating on the basis of PWD

  let mixPWD = [];
  for (let i = 0; i < mix.length; i++) {
    if (mix[i].PWD) {
      mixPWD.push(mix[i]);
      mix.splice(1, i);
    }
  }

  //Sorting on the basis of distance (district, state)

  mix.sort(compDist);
  mixPWD.sort(compDist);

  //PRIORITY 3 - Delhi

  let delhiPWD = [];
  for (let i = 0; i < delhi.length; i++) {
    if (delhi[i].PWD) {
      delhiPWD.push(delhi[i]);
      delhi.splice(1, i);
    }
  }

  //Sorting on the basis of distance within Delhi (pincode)

  delhi.sort(compDist);
  delhiPWD.sort(compDist);

  let finalApplications = outsideDelhiPWD.concat(outsideDelhi,mixPWD,mix,delhiPWD,delhi);
  finalApplications.forEach((ele)=>{
    console.log(ele.PWD,ele.region)
  })
  console.log("Outside Delhi", outsideDelhiPWD, outsideDelhi);
  console.log("Mix", mixPWD, mix);
  console.log("Delhi", delhiPWD, delhi);

  // try {
  //   console.log(applications);
  //   const total_apps = applications.length;
  //   const admissionYear = parseInt(admn_year);
  //   // console.log(from,to,applications)
  //   // console.log(req.body)
  //   const bedIndfo = await Beds.find({ Occupancy: false });
  //   // console.log(bedIndfo);
  //   const total_beds = bedIndfo.length;
  //   let pointer1 = 0;
  //   let pointer2 = 0;
  //   while (pointer1 < total_apps && pointer2 < total_beds) {
  //     let newAllot = {};
  //     if (applications[pointer1].year_of_admission === admissionYear) {
  //       newAllot.ApplicationID = applications[pointer1].stu_id;
  //       newAllot.Occupancy = true;
  //       // console.log(newAllot)
  //       // finding available beds and storing the data
  //       const newAllotment = await Beds.findOneAndUpdate(
  //         { Occupancy: false },
  //         { $set: newAllot },
  //         { new: true }
  //       );
  //       // console.log('level 2')
  //       console.log(newAllotment);
  //       // updating the occupancy history
  //       const newOccupancy = await Occupancy.create({
  //         BedID: newAllotment.BedID,
  //         StudentRollNo: applications[pointer1].roll_no,
  //         StudentYear: applications[pointer1].year_of_admission,
  //         FromDate: from,
  //         ToDate: to,
  //         ApplicationNumber: newAllot.ApplicationID,
  //       });
  //       console.log(newOccupancy);
  //       const newUser = {};
  //       newUser.allotedStatus = "accepted";
  //       app = await Hostel_Applications.findByIdAndUpdate(
  //         { _id: applications[pointer1]._id },
  //         { $set: newUser },
  //         { new: true }
  //       );
  //       pointer1++;
  //       pointer2++;
  //     } else {
  //       pointer1++;
  //     }
  //   }
  //   const rejectedRemaining = await Hostel_Applications.updateMany(
  //     { allotedStatus: "pending" },
  //     { $set: { allotedStatus: "rejected" } },
  //     { new: true }
  //   );
  //   res.status(200).send("got the data");
  // } catch (error) {
  //   res.status(500).send("Internal Server Error");
  // }
});
router.post("/acceptresponses", async (req, res) => {
  try {
    const flag = req.body.acceptResponses;
    const newAllotment = await OpenCloseApplications.findOneAndUpdate(
      { acceptResponses: !flag },
      { $set: { acceptResponses: flag } },
      { new: true }
    );
    console.log(newAllotment);
    res
      .status(200)
      .json({ success: true, message: "Form no longer accepting responses" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
router.get("/acceptresponses", async (req, res) => {
  try {
    const newAllotment = await OpenCloseApplications.find();
    res.status(200).json(newAllotment[0]);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
