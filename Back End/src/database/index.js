const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../app/models/User");
const Occurrence = require("../app/models/Ocurrence");
const Evidence = require("../app/models/Evidence");
const Analysis = require("../app/models/Analysis");
const CorrectiveActions = require("../app/models/CorrectiveActions");

const connection = new Sequelize(dbConfig);

User.init(connection);
Occurrence.init(connection);
Evidence.init(connection);
Analysis.init(connection);
CorrectiveActions.init(connection);

User.associate(connection.models);
Occurrence.associate(connection.models);
Evidence.associate(connection.models);
Analysis.associate(connection.models);
CorrectiveActions.associate(connection.models);

connection
  .sync()
  .then(() => {
    console.log("Tabelas criadas com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao criar tabelas:", error);
  });

module.exports = connection;
