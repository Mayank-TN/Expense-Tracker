const { where } = require('sequelize');
const User = require('../models/userModel');

exports.postNewUser = async (req,res,next)=>{
    try{
        const newUser = req.body ;
    const response = await User.create(newUser);
    res.json(response)
    }
    catch(e){
        res.status(403).json({ error : "User already exist"})
    } 
}


exports.postLogin = async (req,res,next)=>{
        const loggedInUser = req.body.email;
        const loggedInPassword = req.body.password ;

        const response = await User.findOne({where : {email : loggedInUser}})
        if(response === null){
            res.status(404).json({error : 'User not found'});
        }
        else{
            if(response.password === loggedInPassword){
                res.status(200).json({success : 'User loggin successfully'})
            }
            else{
                res.status(401).json({error : 'User not authorized'});
            }

        }
}
