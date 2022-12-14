const mysql = require('mysql2')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('database' , 'root' , 'Tekken99@' , {
    host : 'localhost',
    dialect : 'mysql' ,
    define: {
        timestamps: false
    }
})

module.exports = sequelize;