const Expense = require('./expenseTrackerModel');

exports.getAllExpenses = async (req,res,next)=>{
    const expenses = await Expense.findAll();
    res.json(expenses);
}

exports.postnewExpense = async (req,res,next)=>{
    const result = await Expense.create({
        expenseAmount : req.body.expenseAmount ,
        description : req.body.description,
        category : req.body.category
    })
    res.json('Expense Created Successfully')
}

exports.deleteExpense = async (req,res,next)=>{
    const id = req.params.id ;
    const expense = await Expense.findByPk(id)
    const result = await expense.destroy();
    res.json('Expense Deleted Successfully')

}

exports.editExpense = async (req,res,next)=>{
    const id = req.params.id
    const result = await Expense.findByPk(id).then(expense=>{
        expense.expenseAmount = req.body.expenseAmount
        expense.description = req.body.description
        expense.category = req.body.category
        const response = expense.save().then((response)=>{
            res.json('Expense Updated Successfully')
    })
       
    })
}