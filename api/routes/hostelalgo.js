const readline = require("readline");

function calculatePriority(student) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Is the student already a hosteller? (y/n) ", (str) => {
      if (str === "y") resolve(1);
      else {
        rl.question("Is the student outside Delhi? (y/n) ", (str) => {
          if (str === "y") resolve(2);
          else {
            rl.question("Is the student PWD? (y/n) ", (str) => {
              if (str === "y") resolve(3);
              else {
                rl.question(
                  "Is the student outside Delhi but schooling from Delhi? (y/n) ",
                  (str) => {
                    if (str === "y") resolve(4); //Calculate distance here
                    else {
                      rl.question(
                        "Is the student from Delhi with medical issues? (y/n) ",
                        (str) => {
                          if (str === "y") resolve(5);
                          else {
                            rl.question(
                              "Are the student's parents transferred to another city? (y/n) ",
                              (str) => {
                                if (str === "y") resolve(6);
                                else {
                                  rl.question(
                                    "What is the distance of the student's residence from DTU? (number) ",
                                    (num) => {
                                      const distance = parseInt(num);
                                      resolve(
                                        distance > 0
                                          ? 7 + distance
                                          : Number.MAX_SAFE_INTEGER
                                      );
                                      rl.close();
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  });
}

function allocateBeds(students, bedsAvailable) {
  students.sort((a, b) => a.priority - b.priority);

  for (const student of students) {
    const year = student.year;
    if (bedsAvailable[year - 1] > 0) {
      bedsAvailable[year - 1]--;
      console.log(`Allocated a bed for a student in year ${year}`);
      console.log(`Priority -> ${student.priority}`);
    }
  }
}

// Priority over years :: 4th year->3rd year->2nd year->1st year

// Priority over students ::
// Already Hosteller > Outside Delhi > PWD category > Outside Delhi But Schooling from Delhi >
// Delhi students with medical issues > Delhi students parents transferred >
// Delhi students based on distance from DTU

// Take input as the number of beds for each year
const bedsAvailable = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getInput(question) {
  return new Promise((resolve) => {
    rl.question(question, (input) => {
      resolve(parseInt(input));
    });
  });
}

async function main() {
  for (let i = 0; i < 4; i++) {
    const beds = await getInput(`Number of beds available for year ${i + 1}: `);
    bedsAvailable.push(beds);
  }

  const numberOfStudents = await getInput("Number of students in total: ");
  const students = [];

  for (let i = 0; i < numberOfStudents; i++) {
    const student = {};
    student.year = await getInput("Input student's year: ");
    student.priority = await calculatePriority(student);
    students.push(student);
  }

  allocateBeds(students, bedsAvailable);

  rl.close();
}

main();
