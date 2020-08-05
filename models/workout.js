const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    exercises: [
      {
        day: {
          type: Date,
          default: () => new Date(),
        },
        name: {
          type: String,
          trim: true,
          required: "Enter type of exercise",
        },
        name: {
          type: String,
          trim: true,
          required: "Enter name of exercise",
        },
        duration: {
          type: String,
          trim: true,
          required: "Enter duration of workout(minutes)",
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true,
    },
  }
);
// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
