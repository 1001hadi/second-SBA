// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07", // past due
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  if (course.id !== assignmentGroup.course_id) {
    console.error("Error: Course and assignment group don't match.");
    return [];
  }
  const result = [];

  // return result;
}
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
// console.log(result);

//
///////////////////////////////
// // Helper functions ///////
/////////////////////////////

// handle lerner average
function getAverages(id) {
  let scores = [];
  let possiblePoints = 0;

  for (let items of LearnerSubmissions) {
    let score = items.submission.score;

    if (items.learner_id === id) {
      let submitDate = items.submission.submitted_at;

      // check if date is due
      for (const item of AssignmentGroup.assignments) {
        if (item.id === items.assignment_id) {
          let dueDate = item.due_at;

          if (submitDate <= dueDate) {
            scores.push(score);
            // adding data's possible point.
            possiblePoints += item.points_possible;
          }
        }
      }
    }
  }

  if (scores.length === 0) {
    return "0%";
  }

  let calculateAverage = 0;

  for (let i = 0; i < scores.length; i++) {
    calculateAverage += scores[i];
  }

  let average = (calculateAverage / possiblePoints) * 100;

  return average.toFixed(2) + "%";
}

console.log(getAverages(125));

/////------//////
// const endResult = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0, // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833, // late: (140 - 15) / 150
//   },
// ];
