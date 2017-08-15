const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/db_config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const basename = path.basename(module.filename);
const db = {};

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf('.') !== 0 && file !== basename;
    })
    .forEach((file) => {
        if (file.slice(-3) !== '.js') return;
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;