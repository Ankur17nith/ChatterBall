const express= require('express')
const router = express.Router();
const {createRoom,joinRoom,leaveRoom,getRoomById, getRooms}= require("../controllers/roomController")
const {protect} = require("../middlewares/authMiddlewares")



router.post('/', protect, createRoom)    
router.get('/',protect, getRooms)
router.get("/:roomId", protect, getRoomById)
router.post("/:roomId/join", protect, joinRoom)
router.post("/:roomId/leave", protect, leaveRoom)

module.exports = router;