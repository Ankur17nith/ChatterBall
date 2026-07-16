const User = require("../models/User")
const {setUser}= require("../utils/generateToken")

async function handleUserRegister(req, res){
   try {
    const {name, email, password}= req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Please provide complete credentials"
        })
    }

    const user = await User.create({name, email, password});

    const privateKey= user._privateKey;

    // generate JWT token
    const token = setUser(user);

    // set token as httpOnly cookie
    res.cookie('token', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV ==="production",
        sameSite: 'strict',
        maxAge: 7*24*60*1000      //7 days
    })


    // return user data and private key

    return res.status(201).json({
        sucess: true,
        user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            avatarColor: user.avatarColor,
            publicKey: user.publicKey
        },
        privateKey
    })
   } catch (error) {
    console.error('Register error: error')
    return res.status(500).json({
        success:false,
        message: 'Server error during registration'
    })
   }
}

async function handleUserLogin(req, res){
    try {
        const {email, password}= req.body;

            if(!email || !password){
                return res.status(400).json({
                    success: false,
                    message: 'Please provide complete Credentials'
                })
            }
        const user= await User.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        const isMatch = await user.comparePassword(password)

        if(!isMatch){
            return res.status(401).json({
                success: flse,
                message: 'Invalid email or password'
            })
        }
        // generate JWT token
        const token = setUser(user);

        // set token as httpOnly cookie
        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV ==="production",
            sameSite: 'strict',
            maxAge: 7*24*60*1000      //7 days
        })


        // return user data and private key

        return res.status(201).json({
            sucess: true,
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                avatarColor: user.avatarColor,
                publicKey: user.publicKey
            },
            
        })

    } catch (error) {
        console.error('Login error', error)
        return res.status(500).json({
            success: false,
            message: 'Server error during login'
        })
    }
}


//LOGOUT
async function handleUserLogOut(req, res){
    res.cookie('token','',{
        httpOnly: true,
        expires: new Date(0)
    })

    return res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
}

// // ─── GET CURRENT USER ─────────────────────────────────────────
// // Used by React on app load to check if user is still logged in
// const getMe = async (req, res) => {
//   // req.user is already set by authMiddleware
//   return res.status(200).json({
//     success: true,
//     user: {
//       _id: req.user._id,
//       name: req.user.name,
//       email: req.user.email,
//       avatarColor: req.user.avatarColor,
//       publicKey: req.user.publicKey
//     }
//   })
// }


module.exports= {
    handleUserLogOut,
    handleUserLogin,
    handleUserRegister
}
