"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `UPDATE Occurrences SET status = 'Em Investigação' WHERE status = 'em investigação'`
    );

    await queryInterface.sequelize.query(
      `UPDATE Occurrences SET status = 'Finalizado' WHERE status = 'finalizado'`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `UPDATE Occurrences SET status = 'em investigação' WHERE status = 'Em Investigação'`
    );
    await queryInterface.sequelize.query(
      `UPDATE Occurrences SET status = 'finalizado' WHERE status = 'Finalizado'`
    );
  },
};
