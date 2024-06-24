const express = require("express");
const Workout = require('../models/workoutModel');
const router = express.Router();
const { createNewWorkout, getAllWorkouts, getWorkoutById, deleteWorkout, updateWorkout } = require("../controllers/workoutController");
// GET all workouts
router.get('/', getAllWorkouts);

// GET single workout
router.get('/:id', getWorkoutById);

// POST request
router.post("/", createNewWorkout);

// DELETE a workout
router.delete('/:id',deleteWorkout);

// PATCH a workout
router.patch('/:id', updateWorkout);
module.exports = router;