const express = require('express');
const userController = require('../controllers/userController')
const userRouter = express.Router();

userRouter.post('/signup' , userController.postNewUser );

userRouter.get('/show-user' ,  userController.getUser);



module.exports = userRouter;