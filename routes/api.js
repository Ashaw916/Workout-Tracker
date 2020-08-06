const Workout = require("../models/workout.js");
const router = require("express").Router();

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then((data) => {
      res.json(data);
      console.log(`1 ${data}`);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .limit(7)
    .sort({ day: -1 })
    .then((data) => {
      res.json(data);
      console.log(`2 ${data}`);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  var currentDay = new Date();
  console.log(currentDay);
  var year = currentDay.getFullYear();
  var month = currentDay.getMonth();
  var day = currentDay.getDate();
  console.log("--->", year, month, day);
  // find if existing base on the current day
  // if existing return data
  // ir is not exiten the create
  Workout.find({
    day: new Date(year, month, day),
  }).then((db) => {
    console.log("---->", db, db.length, typeof db);

    if (db.length === 0) {
      console.log("create");
      Workout.create({
        day: new Date(year, month, day, 0, 0, 0, 0),
        // .setDate(new Date().getDate()),
      }).then((data) => {
        console.log(`3 ${data}`);
        res.json(data);
      });
    } else {
      console.log("just return");
      res.json(db);
    }
  });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((data) => {
      console.log(`4 ${data}`);
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
