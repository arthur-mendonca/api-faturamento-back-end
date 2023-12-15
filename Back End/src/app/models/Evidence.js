const { Model, DataTypes } = require("sequelize");

class Evidence extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: DataTypes.STRING,
        fileUrl: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Evidence",
        tableName: "evidences",
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

module.exports = Evidence;
