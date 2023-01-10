const express = require('express');
const userController = require('../controllers/userController')
const userRouter = express.Router();

userRouter.post('/signup' , userController.postNewUser );


userRouter.post('/login' , userController.postLogin );



module.exports = userRouter;