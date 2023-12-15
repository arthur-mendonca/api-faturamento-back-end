const { Model, DataTypes } = require("sequelize");

class Occurrence extends Model {
  static async init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        origin: DataTypes.STRING,
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        description: DataTypes.TEXT,
        status: {
          type: DataTypes.ENUM("Em investigação", "Finalizado"),
          allowNull: false,
          defaultValue: "Em investigação",
        },
      },
      {
        sequelize,
        modelName: "Occurrence",
        tableName: "occurrences",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }

  static associate(models) {
    this.hasMany(models.Evidence, {
      foreignKey: "occurrence_id",
      as: "evidences",
    });
  }

  static associate(models) {
    this.hasOne(models.Analysis, {
      foreignKey: "occurrence_id",
      as: "analysis",
    });
  }
  static associate(models) {
    this.hasMany(models.CorrectiveAction, {
      foreignKey: "occurrence_id",
      as: "corrective_action",
    });
  }
}

module.exports = Occurrence;
