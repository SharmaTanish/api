const { response } = require("express");
const {Users} = require("../models/users");

const register = async (request,response) => {
    const {username} = request.body;

    const isUserExist = await Users.findOne({username:username});
    if(isUserExist){
        return response.json({error:"This username already exist"});
    }


    var user = new Users(request.body);
    user = await user.save();

    //to not send these 2 in frontend
    user.encry_password = undefined;
    user.key = undefined;

    return response.json({status:"User Created", user});


}


const signin = async (request,response) => {
    const {username,password} = request.body;

    var isUserExist = await Users.findOne({username:username});
    if(!isUserExist) {
        return response.json({error:"Username not exists!"});
    }

    //validate password with encrypted password stored in DB
    if(!isUserExist.authenticate(password)){
        return response.json({error:"Password does not match!"})
    }

    return response.json({status:"SignedIn successfully!",isUserExist});




}


module.exports = {register,signin};

