const express = require("express").Router();
const route = require("express").Router();
const stdModule = require("./schema");
const { registerValidate, loginValidate } = require('./validation')
const bcrypt = require("bcrypt");

// api for send data register
route.post("/registerStd", async (req, res) => {

    // Validate student 
    let { error } = await registerValidate(req.body)
    if (error) return res.status(404).send(error.details[0].message);

    // Check Email exist or not
    let alreadyExist = await stdModule.findOne({ email: req.body.email })
    if (alreadyExist) return res.status(404).send(" Student Already Exist ");

    // hide password
    let salt = await bcrypt.genSalt(10);
    let hashPass = await bcrypt.hash(req.body.password, salt);



    let newStd = new stdModule({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
        age: req.body.age,
        education: req.body.education,
        address: req.body.address,
        mobile: req.body.mobile
    })
    try {
        const saveData = await newStd.save();
        res.send(saveData)
    } catch (error) {
        console.log(error);
    }

})

//Login api
route.post("/login", async (req, res) => {

    //login validation
    let { error } = await loginValidate(req.body)
    if (error) return res.status(404).send(error.details[0].message);

    let userExist = await stdModule.findOne({ email: req.body.email });
    if (!userExist) return res.status(404).send(" Invalid User..!! ");

    let userPass = await bcrypt.compare(req.body.password, userExist.password)
    if (!userPass) return res.status(404).send(" Invalid Password ");

    return res.status(200).send("Login Successful")

})

// show all data
route.get("/showStd", async (req, res) => {
    try {
        let showData = await stdModule.find();
        res.send(showData);
    } catch (error) {
        console.log(error);
    }
})

// delete data
route.delete("/deleteStd", async (req, res) => {
    const id = req.query.id;
    try {
        let del = await stdModule.findByIdAndDelete(id);
        res.send("Data Deleted SuccessFully");
    } catch (error) {
        console.log(error);
    }
})

//update data using post
route.post("/updateStd", async (req, res) => {
    let id = req.body.id;
    try {
        let upd = await stdModule.findByIdAndUpdate(id, req.body)
        res.send("Updated Successfully");
    } catch (error) {
        console.log(error);
    }
})

// update data using put
route.put("/updateStdByPut", async (req, res) => {
    try {
        // let result = await stdModule.findOne({ email:req.body.email },{})
        let result = await stdModule.findOneAndUpdate({ email: req.body.email }, { $set: req.body })

        res.send("Data Updated");
    } catch (error) {
        console.log(error);
    }
})

// update data using patch
route.patch("/updateStdByPatch", async (req, res) => {
    try {
        const id = req.query.id;
        let result = await stdModule.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).send(result)
    } catch (error) {
        console.log(error);
    }
})

// find data by id
route.get("/getOneStd", async (req, res) => {
    let id = req.query.id;
    try {
        let findOne = await stdModule.findById(id);
        res.send(findOne);
    } catch (error) {
        console.log(error);
    }
})


module.exports = route;