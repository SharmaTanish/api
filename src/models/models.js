//here we will create schema/structure of our "first_db" database

const mongoose = require("mongoose");

//jo frontend se data aaega uss object ki keys bikul same name hone chahiye as we give below in schema to store in db!
const studentSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    username:{type:String, unique:true},
    password:String,
}
,
//by passing this object moongoose automatically store the time stamp of cretion and updation of the data!
{timestamps:true}
)

//here we are creating a collection/table named "Student" whose schema is studentSchema ans we are are storing the object in name of "Student" , therefore all the changes in this table will be done by using "Student" variable!
const Student = mongoose.model("Student",studentSchema);

module.exports = {Student};



/*
1. virtual, methods of schema!! (concepts)
[Making proper user authentication :- ]
2. npm install crypto-js (secret key generator)
3. npm install uuid (uuid se agar 2 users same password bhi dalte hai toh bhi inn password ke cooresponding secret key alag hogi, therefore more secure!)
[var ciphertext = crytojs.AES.encrypt("mypassword",uuid.v4())).toString();]


*/