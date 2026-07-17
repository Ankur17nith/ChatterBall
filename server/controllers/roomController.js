const Room = require('../models/Room');
const User = require('../models/User')

async function createRoom(req, res){
    try {
        const {name, description, isPrivate}= req.body;

        if(!name || !name.trim()){
            return res.status(400).json({
                success: false,
                message:"Room name is required"
            })
        }

        const room = await Room.create({
            name: name.trim(),
            description,
            isPrivate,
            createdBy: req.user._id,
            members: [req.user._id],
        })

        return res.status(201).json({
            success: true,
            message: "Room created Successfully"
        })
    } catch (error) {
        console.error("Create room error", error)

        return res.status(500).json({
            success:false,
            messsage: "Internal Server Error"
        })
    }
}


async function getRooms(req, res){
    try {
        const room= await Room.find({
            $or:[
                {isPrivate: false},
                {members: req.user._id}
            ]
        }).populate("createdBy", "name avatarColor");

        return res.status(200).json( {
            success: true,
            rooms
        })
    } catch (error) {
        console.error("Get room error", error)

        return res.status(500).json({
            success:false,
            messsage: "Internal Server Error"
        })
    }
}


async function joinRoom(req, res){
    
}

module.exports= {
    createRoom,
    getRooms,
}