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
    try {
        const {roomId}= req.params;
        const {inviteCode}= req.body;

        const room= await Room.findById(roomId);

        if(!room){
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        if(room.members.includes(req.user._id)){
            return res.status(400).json({
                success:false,
                message: "Already a member"
            })
        }

        if(room.isPrivate){
            if(room.inviteCode!== inviteCode){
                return res.status(403).json({
                    success: false,
                    message:"Invalid invite code"
                })
            }
        }
        room.members.push(req.user._id);
        await room.save()

        return res.status(200).json({
            success: true,
            message:"Joined Room Successfully"
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
}


async function leaveRoom(req, res){
    try {
        const {roomId}= req.params;
        const room = await Room.findById(roomId)

        if(!room){
            return res.status(400).json({
                success:false,
                message: "Room doesn't exist"
            })
        }

        const isMember= room.members.some(  
            member => member.toString === req.user._id.toString
        )

        if(!member){
            return res.status(400).json({
                success: false,
                message: "You are not the member of this room"
            })
        }

        if(room.createdBy.toString === req.user._id.toString){
            await Room.findByIdAndDelete(roomId);

            return res.status(200).json({
                success:true,
                message:"Room deleted because owner left"
            })
        }

        room.members = room.members.filter(
            member => member.toString !== req.user._id.toString
        )

        await room.save();
        return res.status(200).json({
            success:true,
            message:"Left Room successfully"
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:"Internal Server Error"
        })
    }
}

async function getRoomById(req, res){
    try {
        const {roomId}= req.params;
        const room = await Room.findById(roomId)
            .populate("members", " name " , "avatarColor")
            .populate("createdBy","name", "avatarColor")
        
        if(!room){
            return res.status(400).json({
                success: false,
                message: "Room doesn't found"
            })
        }

        if(room.isPrivate){
            const isMember = room.members.some(
                member => member._id.toString()=== req.user._id.toString()
            );

            if(!isMember){
                return res.status(400).json({
                    success:false,
                    message: "Accesss Denied"
                })
            }
        }

        return res.status(200).json({
            success: false,
            room
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:"Internal Server Error"
        })
    }
}

module.exports= {
    createRoom,
    getRooms,
    joinRoom,
    leaveRoom,
    getRoomById
}