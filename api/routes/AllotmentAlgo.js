function compDist(a, b) {
  if (a.distance > b.distance) {
    return 1;
  } else if (a.distance < b.distance) {
    return -1;
  } else {
    return 0;
  }
}

function AllotmentAlgo(applications, from, to, admn_year) {
  let outsideDelhi, delhi, mix;

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
  let outsideDelhiPWD;

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

  let mixPWD;
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

  let delhiPWD;
  for (let i = 0; i < delhi.length; i++) {
    if (delhi[i].PWD) {
      delhiPWD.push(delhi[i]);
      delhi.splice(1, i);
    }
  }

  //Sorting on the basis of distance within Delhi (pincode)

  delhi.sort(compDist);
  delhiPWD.sort(compDist);

  console.log("Delhi", delhiPWD, delhi);
  console.log("Outside Delhi", outsideDelhiPWD, outsideDelhi);
  console.log("Mix", mixPWD, mix);
}

export default AllotmentAlgo;
