const Workout = require("../models/workoutModel");
const mongoose = require('mongoose');
// get all Workouts

async function getAllWorkouts(req, res) {
    try {
        const user_id = req.user._id;
        // sort the data according to created date and time
        const allWorkouts = await Workout.find({user_id}).sort({ createdAt: -1 });
        res.status(200).json(allWorkouts);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// get single workout
async function getWorkoutById(req, res) {

    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }
    console.log(id);
    const workout = await Workout.findById(id);

    if (!workout) {
        res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);

}


// create new workout

async function createNewWorkout(req, res) {
    const { title, reps, load } = req.body;

    let emptyFields = [];
    if(!title){
        emptyFields.push('title');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(!load){
        emptyFields.push('load');
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error:"Please fill all fields",emptyFields});
    }
    console.log(title, load, reps);
    try {
        // add doc to db
        const user_id = req.user._id;

        const workout = await Workout.create({ title, reps, load,user_id });
        res.status(200).json(workout);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
}

// delete workout

async function deleteWorkout(req, res) {
    const id  = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
        res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
}


// update a workout
async function updateWorkout(req, res) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!workout) {
        res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json(workout);

}




module.exports = {
    createNewWorkout,
    getAllWorkouts,
    getWorkoutById,
    deleteWorkout,
    updateWorkout
}