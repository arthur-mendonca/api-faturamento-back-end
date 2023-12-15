const { Model, DataTypes } = require("sequelize");

class Analysis extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: DataTypes.STRING,
        description: DataTypes.STRING,
        fileUrl: DataTypes.STRING,
        occurrence_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Analysis",
        tableName: "analysis",
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

module.exports = Analysis;
