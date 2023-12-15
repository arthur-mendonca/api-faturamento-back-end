"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Analysis", {
      fields: ["occurrence_id"],
      type: "unique",
      name: "unique_constraint_occurrence_id",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Analysis",
      "unique_constraint_occurrence_id"
    );
  },
};
