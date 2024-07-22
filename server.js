require("dotenv").config()
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const express  = require("express");
const cors = require('cors');
const workoutRoutes = require('./routes/workout');
const userRoutes = require('./routes/user');
const app = express();

app.use(cors({
    origin: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
}));


// middleware

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})
// routes
app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database connected");
    app.listen(PORT?4000:PORT,()=>console.log(`server started at ${process.env.PORT}`))
})
.catch((error)=>{
    console.log(error);
});

