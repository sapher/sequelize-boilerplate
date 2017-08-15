const db = require('./models');

db.sequelize.authenticate().then(() => {

    console.log("Connected to database");

    db.sequelize.sync({ force: true }).then(() => {
        console.log("ready to start");
    });

}).catch((err) => {
    console.error("Unable to connect to database > " + err);
});