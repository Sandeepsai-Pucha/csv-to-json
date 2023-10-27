const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'Sandeepsai@204', {
    host:'localhost',
    dialect:'mysql',
    pool: {
        max:5, 
        min:0,
        idle:10000
    }
});

const dataBase = {};

dataBase.Sequelize = Sequelize
dataBase.sequelize = sequelize

dataBase.sequelize.sync({ alter: true })
.then(() => {
    console.log('Database Dropped & re-synced')
})
.catch(error => {
    console.log('Failed to Sync Database: ', error)
})

dataBase.jsonFile = require('./json.file')(sequelize, DataTypes)

module.exports = dataBase


