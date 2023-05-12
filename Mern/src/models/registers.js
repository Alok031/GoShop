const mongoose=require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
    },
    order_id:{
        type:[]
    },
    Password:{
        type:String,
        required:true
    },
    Confirm_Password:{
        type:String,
        required:true 
    },
    refreshToken:{
        type:String,
        default:null,
    }
})

const Register = new mongoose.model("Register",userSchema);

module.exports = Register;