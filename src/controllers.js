const { request, response } = require("express");
const {Student} = require("./models");

const getAllStudentsOld = (request,response)=>{
    var students = ["Tanish","sharma"];
    var id = request.query.id;//request contains url which is called by frontend!!
    response.json(id!==undefined ? students[id] : students);
    //.send() always return data in string type which cannot be converted to json. Only json type data can be converted to json!!
    //therefore use response.json()
    // response.send("<h3>Hello world!</h3>"); //html works here!
}

const getAllStudents = async (request,response) =>{
    
    //to get student by its id not all students (in postman send get request with id as params!)
    var _id = request.query.id;

    if(_id){
        var allStudents = await Student.findById(_id);
    }
    else{
         //fetch all data present in Student collection of database!
        var allStudents = await Student.find();
    }
    
    
    response.json(allStudents);
}

const createStudents = async (request,response) =>{
    console.log(request.body);//we can get the body which we send via postman as we are using body-parser as middleware!
    await Student.create(request.body); // this is the only line written to stode data/request.body wala object in Student table in database!
    response.json({status:"Student created"});
}

const updateStudents = async (request,response) =>{
    var _id = request.query.id;
    var data = request.body; //ever key in this object will get updated in database
    await Student.findByIdAndUpdate(_id,data);//update data from database
    response.json({status:"Student updated"});
}

const deleteStudents = async (request,response) =>{
    var _id = request.query.id;

    await Student.findByIdAndDelete(_id);
    response.json({status:"Student deleted"});
}

module.exports={getAllStudentsOld,getAllStudents,createStudents,updateStudents,deleteStudents};


/*

*/