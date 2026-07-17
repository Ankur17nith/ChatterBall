const mongoose= require('mongoose');
const { nanoid } = require("nanoid");

const RoomSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [, "Room Name is required"]
    },
    description:{
        type:String,
        default:""

    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    isPrivate:{
        type: Boolean,
        default: false
    },
    inviteCode:{
        type: String,
        unique: true,
        sparse: true,
    },
    pinnedMessage:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
    createdAt:{

    }
}, { timestamps: true});



RoomSchema.pre('save', function(next){
    if(this.isPrivate && !this.inviteCode){
        this.inviteCode= nanoid(10);
    }
    next();
})


const room= mongoose.model('room', RoomSchema);

module.exports= room;