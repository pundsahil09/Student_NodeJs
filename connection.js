const express = require("express");
const app = express();
const mongoose = require("mongoose");
let color = require("colors");
const route = require("./API");
const PORT = 4500;

app.use(express.json());
app.use("/user",route)
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://sahil:Sahilpund100@cluster0.vlajov8.mongodb.net/DEMO?retryWrites=true&w=majority").then((data) => {
    console.log('<------------ CONNECTION CREATED ------------>'.brightMagenta);
}).catch((error) => {
    console.log(`There is some error : ${error}`.red);
})

app.listen(PORT,()=>{
    console.log(` App is running on port : ${PORT} `);
});