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
  Workout.create({
    day: new Date().setDate(new Date().getDate()),
  }).then((data) => {
    console.log(`3 ${data}`);
    res.json(data).catch((err) => {
      res.json(err);
    });
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
