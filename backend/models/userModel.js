const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false
        },
        pic:{
            type:String,
            required:true,
            default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }
    },{
        timestamps:true
    }
)

// before we are saving the data to the database we want something that encrypts our data
// we want our password to be encrypted 
// before saving what we de we call a function 
// next => middleware after this operation done it can move on the next part of the operation
userSchema.pre('save',async function(next){
    // if its not modify then we gone a move on
    if(!this.isModified('password')){
       return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// decrypt the password
userSchema.methods.matchPassword = async function(enteredPassword) {
 return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model('User',userSchema);

module.exports = User;