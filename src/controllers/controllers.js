const { request, response } = require("express");
const {Student} = require("../models/models");

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

    var _name = request.query.name;

    var {minAge,maxAge}=request.query;//object destructing!

    if(_id){
        var allStudents = await Student.findById(_id);
    }
    else if(_name){
        //to find by any other key --> Student.find({name:"Tanish"});
        // also there exists various functions like "findOne({})" which only return the first entry which is matched, if want one entry but not first one then have to use find() only and then use slicing etc to filter further!
        //findOne returns object and find returns array of objects!
        var allStudents = await Student.find({name:_name}) //this "name" variable should be same as the key of database table
    }
    else if(minAge && maxAge){
        //means age should be greater than equal to minAge, similarly $lt is less than and $lte means less than equal!!
        //here if anyone of maxAge/minAge is undefined then it will not retrive data, i.e, empty, but as we are not using .save() so it will not change anything permanently in DB, i.e., it will just show age undefined but actually age is not undefined in DB!
        var allStudents = await Student.find({age:{$gte:minAge,$lte:maxAge},}).select("email age");
        //here after find() select() also works, in select we just pass a sting in which we write keys which we want to display space-separated, i.e, above only email and age will be display (also id is mandetory to be displayed) but name will not be displayed!
        
    }
    else{
         //fetch all data present in Student collection of database!
        var allStudents = await Student.find();
    } 

    
    
    /*
    // we have various functionalities with find()

    //mutiple conditions!! (here there exist or operator between 2 objects/conditions of array)
    1. var allStudents = await Student.find({
        //these values are case-sensitive ,i.e., if name "Tanish" then only display "tanish" will not display!!
        $or : [{name:"Tanish",age:{$lt:20}} , {name:"sharma"}],
    })
    //by default $and

    2. to get just the count of data that satsfies conditions not whole data :-
     var allStudents = await Student.find({age:{$gt:19}}).count();

    */

    
    
    
    
    response.json(allStudents);
}

const createStudents = async (request,response) =>{
    /*
    console.log(request.body);//we can get the body which we send via postman as we are using body-parser as middleware!
    var newStudent = await Student.create(request.body); // this is the only line written to stode data/request.body wala object in Student table in database!
    //we can get the object created returned as collected above in newStudent variable!
    response.json({status:"Student created",data:newStudent}); //to send anything to frontend pass that in this object!
    */
    
    //if data jo frontend se aa rahah hai uss mai chenges karke database mai baad mai save karna hai the :-
    var oneStudent = new Student(request.body); //here just created the object of Student
    var currage = request.body.age;
    oneStudent.age = currage+5;
    
    oneStudent = await oneStudent.save(); //here we save the object created in database!
    response.json({status:"Student created",data:oneStudent});







}

const updateStudents = async (request,response) =>{
    /*
    var _id = request.query.id;
    var data = request.body; //ever key in this object will get updated in database
    await Student.findByIdAndUpdate(_id,data);//update data from database
    response.json({status:"Student updated"});

    */

    //if wanted to update only the name not the the age the cant direclty pass data to databse as we will receive only name in data object!
    var _id = request.query.id;
    var data = request.body;

    var oneStudent = await Student.findById(_id);
    oneStudent.name=data.name;
    oneStudent = await oneStudent.save();

    response.json({status:"student updated",data:oneStudent});



}

const deleteStudents = async (request,response) =>{
    var _id = request.query.id;

    deletedStudent = await Student.findByIdAndDelete(_id);
    response.json({status:"Student deleted",data:deletedStudent});
}


const validateLogin =  async (request,response) =>{
    var username = request.body.username;
    var password = request.body.password;

    var res = await Student.find({username:username,password:password});
    //in res get array of users satisfy the condition!
    if(res.length===0){
        response.json({status:"Cannot find user!"})
    }
    else{
        response.json({status:"Logged in successfully"});
    }

}


const validateSignup =  async (request,response) =>{
    

    var res = await Student.create(request.body);


    response.json({status:"Account created successfully"});
    

}

module.exports={getAllStudentsOld,getAllStudents,createStudents,updateStudents,deleteStudents,validateLogin,validateSignup};


/*

*/