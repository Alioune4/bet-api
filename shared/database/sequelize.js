const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('postgres://user:postgresPass@localhost:5432/js')


sequelize.authenticate().then(() => {
    console.log('Connection to postgres has been established successfully.');

}).catch((error) => {
    console.error('Unable to connect to the postgres database:', error);
})



module.exports = sequelize;
