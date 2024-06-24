require("dotenv").config()
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const express  = require("express");
const routesHandler = require('./routes/workout');
const app = express();


// middleware

app.use(express.json());    // to access the req during post and patch
// app.use((req,res,next)=>{
//     console.log(req.path,req.method);
//     next();
// });


app.use('/api/workouts',routesHandler);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database connected");
    app.listen(PORT?4000:PORT,()=>console.log(`server started at ${process.env.PORT}`))
})
.catch((error)=>{
    console.log(error);
});

