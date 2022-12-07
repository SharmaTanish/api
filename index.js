const express = require("express");
const server = express();
const cors = require("cors");
const {getAllStudents,getAllStudentsOld,createStudents,updateStudents,deleteStudents}=require("./src/controllers");
const parser = require("body-parser");
const mongoose = require("mongoose");

//connect with mongodb
//first_db is name of the database we want to connect!
//here we are using local installed mongodb database, but we cam also use cloud database provided by mongodb for free called atlas.
mongoose.connect("mongodb://localhost:27017/first_db");

//these "connected" , "error" are kind of event listeners like we have onclick etc in JS!
mongoose.connection.on("connected",()=>{
    console.log("DB Connection");
})
mongoose.connection.on("error",()=>{
    console.log("DB not connected");
})


server.use(cors());
server.use(parser());


/*
getAllStudents is this function which we moved in seperated file ->
(request,response)=>{
    var students = ["Tanish","sharma"];
    var id = request.query.id;//request contains url which is called by frontend!!
    response.json(id!==undefined ? students[id] : students);
    //.send() always return data in string type which cannot be converted to json. Only json type data can be converted to json!!
    //therefore use response.json()
    // response.send("<h3>Hello world!</h3>"); //html works here!
}
*/

server.get("/",getAllStudentsOld);
server.get("/students",getAllStudents);
server.post("/create-new-students",createStudents);
server.put("/update-students",updateStudents); //if use other than put then get error!
server.delete("/delete-students",deleteStudents);

//.post() means server is handling post request!

// server.get("/users",(request,response)=>{
//     response.send("<h3>Hello users!</h3>");
// })

// server.get("/posts",(request,response)=>{
//     response.send("<h3>Read posts from here!</h3>");
// })


//listen always on last!
server.listen(3000,()=>{
    console.log("Server started on 3000 port")
});
