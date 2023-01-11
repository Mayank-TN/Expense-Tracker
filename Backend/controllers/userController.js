const { where } = require('sequelize');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.postNewUser = async (req,res,next)=>{
    try{
        const name = req.body.name ;
        const email = req.body.email;
        const password = req.body.password;
        const hash = await bcrypt.hash(password , 10);
        const response = await User.create({name , email , password : hash});
         res.json({success : "User created successfully"})
    }
    catch(e){
        res.status(500).json({ error : "User already exist"})
    } 
}


exports.postLogin = async (req,res,next)=>{
        try{
            const loggedInUser = req.body.email;
        const loggedInPassword = req.body.password ;


        const response = await User.findOne({where : {email : loggedInUser}})
        if(response === null){
            res.status(404).json({error : 'User not found'});
        }
        else{
           
            const bool = await bcrypt.compare(loggedInPassword , response.password);
            console.log(loggedInPassword, response.password , bool)
            if(bool){
                res.status(200).json({success : 'User loggin successfully'})
            }
            else{
                res.status(401).json({error : 'User not authorized'});
            }

        }
        }
        catch(e){
            console.log(e);
        }
}
