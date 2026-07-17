const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

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
        select: false
    },
    avatarColor:{
        type:String,
        default: ()=>`#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    },
    publicKey:{
        type: String,
    },
    lastSeen:{
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});



UserSchema.pre("save",  async function (next){
    if(!this.isModified("password")) return next();

    if(this.isNew){
        const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa',{
            modulusLength: 2048,
            publicKeyEncoding:{type:'spki', format: 'pem'},
            privateKeyEncoding: {type: 'pkcs8', format: 'pem'}
        })
        this.publicKey = publicKey,
        this._privateKey= privateKey

    }

    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


UserSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);

}

const user= mongoose.model('user', UserSchema);

module.exports= user;