const express = require('express');
const expenseTrackerController = require('../controllers/expenseTrackerController')
const expenseRouter = express.Router();

expenseRouter.get('/getAllExpenses' , expenseTrackerController.getAllExpenses)

expenseRouter.post('/postNewExpense' , expenseTrackerController.postnewExpense )

expenseRouter.delete('/deleteExpense/:id' , expenseTrackerController.deleteExpense)

expenseRouter.put('/editExpense/:id' , expenseTrackerController.editExpense)



module.exports = expenseRouter;