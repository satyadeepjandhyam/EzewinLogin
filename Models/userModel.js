const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    Name : {type: String, required: true},
    Email : {type: String, required: true, unique: true},
    Phone_Number : {type: Number, required: true, unique: true},
    Gender : {type:String, enum:["Male", "Female", "Other"] },
    Password : {type: String, required: true},
    isAdmin : {type: Boolean, required:false, default: false}
},{
    timestamps: true
});

//REGISTER
UserSchema.pre("save", async function (next) {
    if(!this.isModified("Password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
});

//LOGIN
UserSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.Password)
};

const User = mongoose.model("User",UserSchema)
module.exports = User;