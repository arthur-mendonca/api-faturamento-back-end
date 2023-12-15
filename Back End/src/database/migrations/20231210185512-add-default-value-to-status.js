"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Occurrences", "status", {
      type: Sequelize.ENUM("Em investigação", "Finalizado"),
      allowNull: false,
      defaultValue: "Em investigação",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Occurrences", "status", {
      type: Sequelize.ENUM("Em investigação", "Finalizado"),
      allowNull: false,
    });
  },
};
