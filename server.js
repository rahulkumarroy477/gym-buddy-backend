require("dotenv").config()
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const express  = require("express");
const routesHandler = require('./routes/workout');
const app = express();

app.use(cors({
    origin: 'https://your-frontend-domain.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
}));


// middleware

app.use(express.json());


app.use('/api/workouts',routesHandler);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database connected");
    app.listen(PORT?4000:PORT,()=>console.log(`server started at ${process.env.PORT}`))
})
.catch((error)=>{
    console.log(error);
});

