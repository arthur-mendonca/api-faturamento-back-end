const { Model, DataTypes } = require("sequelize");

class CorrectiveAction extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: "CorrectiveAction",
        tableName: "correctiveactions",
        underscored: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Occurrence, {
      foreignKey: "occurrence_id",
      as: "occurrence",
    });
  }
}

module.exports = CorrectiveAction;
