const {Sequelize} = require('sequelize')
const retry = require('retry');


const sequelize = new Sequelize('postgres://user:postgresPass@postgres:5432/js')

const operation = retry.operation({ retries: 5, factor: 3, minTimeout: 5000 });

/*sequelize.authenticate().then(() => {
    console.log('Connection to postgres has been established successfully.');

}).catch((error) => {
    console.error('Unable to connect to the postgres database:', error);
})*/

operation.attempt((currentAttempt) => {
    console.log(`Connecting to database, attempt ${currentAttempt}`);
    sequelize
        .authenticate().then(() => {
            console.log('Connection to database successful');
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
            if (operation.retry(err)) {
                return;
            }
            console.error('Max retries reached, exiting');
        });
});



module.exports = sequelize;
