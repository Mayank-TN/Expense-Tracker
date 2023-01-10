const express = require('express');
const cors = require('cors')
const sequelize = require('./utils/mysql');
const expensesRoutes = require('./routes/expenseRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();
app.use(cors())

app.use(express.json())

app.use('/expenses', expensesRoutes)

app.use('/user' , userRoutes )

sequelize.sync().then((result) => { 
    app.listen(3000);
}).catch((err) => {
    console.log(err)
});