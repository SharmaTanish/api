//here we will create schema/structure of our "first_db" database

const mongoose = require("mongoose");

//jo frontend se data aaega uss object ki keys bikul same name hone chahiye as we give below in schema to store in db!
const studentSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
})

//here we are creating a collection/table named "Student" whose schema is studentSchema ans we are are storing the object in name of "Student" , therefore all the changes in this table will be done by using "Student" variable!
const Student = mongoose.model("Student",studentSchema);

module.exports = {Student};