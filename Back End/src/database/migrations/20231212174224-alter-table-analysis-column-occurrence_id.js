"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Analysis", "occurrence_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "Occurrences", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Analysis", "occurrence_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Occurrences", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
