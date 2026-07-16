const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    avatorColor:{
        type:String,
        required: true,
    },
    publicKey:{
        type: String,
        default:""
    },
    lastSeen:{
        type: String,
        default: Date.now,
    },
    isOnline:{
        type: Boolean,
        default: false,
    }
}, {timestamps: true});



UserSchema.pre("save",  async function (next){
    if(!this.isModified("password")) return;

    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


UserSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);

}

const user= mongoose.model('user', UserSchema);

module.exports= user;