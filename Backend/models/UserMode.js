// user collection 

const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    Fullname:{
        type:String,
        required:true,
        unique:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true,
    },
    ConfPassword:{
        type:String,
        required:true,
    },
    Profile:{
        type:String,
        default:`https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?semt=ais_hybrid`,
    },
    Gender:{
        type:String,
        required:true,
    }
});

// model 

const User=mongoose.model("FitUser",UserSchema);

// let work ("check leet user id is right or not ");

module.exports=User;