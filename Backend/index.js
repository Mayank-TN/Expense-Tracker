const express = require('express');
const cors = require('cors')
const sequelize = require('./mongoDb');
const expensesRoutes = require('./expenseRoutes')

const app = express();
app.use(cors())

app.use(express.json())

app.use('/expenses', expensesRoutes)

sequelize.sync().then((result) => { 
    app.listen(3000);
}).catch((err) => {
    console.log(err)
});