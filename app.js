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

// i changed the function parameters name to more meaning full name from original given example
function getLearnerData(course, assignmentGroup, learnerSubmissions) {
  try {
    // check if courseInfo id and assignment id match
    if (course.id !== assignmentGroup.course_id) {
      console.log("course id and assignment group id must match!");
      return [];
    }

    const result = [];

    // create leaner obj to store their data
    // get current date
    // iterate through learner submissions and find the assignment in the assignment group
    // if an assignment is found, check if its due.
    const learnerScores = {};
    let currDate = new Date();

    // iterate over learner submission to get submission data
    for (let i = 0; i < learnerSubmissions.length; i++) {
      let submission = learnerSubmissions[i];
      let assignment;

      // iterate over assignments to get assignment data
      // and assign it to assignment var, when collect the data break;
      for (let j = 0; j < assignmentGroup.assignments.length; j++) {
        let assignmentData = assignmentGroup.assignments[j];
        if (assignmentData.id === submission.assignment_id) {
          assignment = assignmentData;
          break;
        }
      }

      // check if the assignments are due,
      //  if not and match the learner, add them to learner score
      if (assignment) {
        let dueDate = new Date(assignment.due_at);
        if (dueDate < currDate) {
          if (!learnerScores[submission.learner_id]) {
            learnerScores[submission.learner_id] = {};
          }
          if (!learnerScores[submission.learner_id].scores) {
            learnerScores[submission.learner_id].scores = [];
          }

          // check if submission is due cut 10%, make sure score not going negative
          let score = submission.submission.score;

          let submitDate = new Date(submission.submission.submitted_at);
          // this part solved with hint from stack overflow!
          if (submitDate > dueDate) {
            score - +assignment.points_possible * 0.1;
            if (score < 0) {
              score = 0;
            }
          }

          // push learners score to their obj of data
          learnerScores[submission.learner_id].scores.push({
            assignment_id: submission.assignment_id,
            score: score,
            points_possible: assignment.points_possible,
          });
        }
      }
    }

    // iterate over learner scores obj and check their scores.
    for (let learner in learnerScores) {
      let leanerData = learnerScores[learner];
      let totalScore = 0;
      let totalPossibleScore = 0;
      let assignmentScoresObj = {};

      for (let h = 0; h < leanerData.scores.length; h++) {
        let score = leanerData.scores[h];
        // console.log(score);

        // check if score is not positive number, log msg to console
        if (typeof score.score !== "number") {
          console.log("score must be a positive number!");
          return;
        }
        if (
          typeof score.points_possible !== "number" ||
          score.points_possible === 0
        ) {
          console.log("possible point only can be a positive number!");
          return;
        }

        // add total scores, possible scores and assignment score values to their variables
        totalScore += score.score;
        totalPossibleScore += score.points_possible;
        // this part solved with hint from stack overflow!
        assignmentScoresObj[score.assignment_id] = Number(
          (score.score / score.points_possible).toFixed(2) * 100
        );
      }

      // get average of scores return 0 if not matched
      // this part solved with hint from stack overflow!
      let averageScores = 0;
      if (totalPossibleScore > 0) {
        averageScores = totalScore / totalPossibleScore;
      } else {
        averageScores = 0;
      }

      // push the values{obj} to result array and return it
      result.push({
        id: Number(learner),
        average: Number(averageScores * 100),
        ...assignmentScoresObj,
      });
    }

    return result;
  } catch (err) {
    console.log(err);
    // return empty array when error happened.
    return [];
  }
}
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

//////////////////
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
