const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const uuid = require("uuid");


const userSchema = new mongoose.Schema(
    {
        name:String,
        username:String,
        encry_password:String,
        key:String,
    }
    ,
    {
        timestamp:true
    }
);


userSchema.virtual("password").set(function(password){
    this.key=uuid.v4();
    this.encry_password = this.securePassword(password);
});

userSchema.methods = {
    securePassword : function (password){
        //AES algo returns different encry_password evertime on passing same password also, so we use SHA256 algo which returns same key evertime we call this function with same password!
        var encry_password = CryptoJS.SHA256(password,this.key).toString();
        return encry_password;
    },

    authenticate : function(password){
        return this.encry_password==this.securePassword(password);
    }
}


const Users = mongoose.model("Users",userSchema);

module.exports = {Users};