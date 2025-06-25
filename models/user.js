import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,

    },
    lastName : {
        type : String,
        required : true,

    },
    email : {
        type : String,
        requied : true,
        unique : true,

    },
    password : {
        type :String,
        requied : true,
    },

    phone : {
        type :String,
        default : "Not given"
    
    },

    isBlocked : {
        type :Boolean,
        default : false,
    },

    role : {
        type: String,
        default : "user"

    },

    isEmailVerified : { 
        type: Boolean,
        default : false,

    },
    image : {
        type :String,
        default : "https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg",

    },

})

const User = mongoose.model("user",userSchema)

export default User;

