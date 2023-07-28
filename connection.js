const express = require("express");
const app = express();
const mongoose = require("mongoose");
let color = require("colors");
const route = require("./API");
const env = require("dotenv")
env.config();
const PORT = process.env.PORT;



app.use(express.json());
app.use("/user", route)
mongoose.set('strictQuery', true);
mongoose.connect(process.env.URL).then((data) => {
    console.log('<------------ CONNECTION CREATED ------------>'.brightMagenta);
}).catch((error) => {
    console.log(`There is some error : ${error}`.red);
})

app.listen(PORT, () => {
    console.log(` App is running on port : ${PORT} `);
});