const User = require('../models/userModel');

exports.postNewUser = async (req,res,next)=>{
    try{
        const newUser = req.body ;
    const response = await User.create(newUser);
    res.json(response)
    }
    catch(e){
        res.status(403).send(e.message)
    } 
}

exports.getUser = (req,res ,next) =>{
    res.json('wornsjdndsnsking')
}