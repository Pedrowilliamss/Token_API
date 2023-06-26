'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class guiche extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      guiche.hasMany(models.atendimento, {
        foreignKey: 'id_guiche',
      });
    }
  }
  guiche.init({
    descricao: {
      type: DataTypes.STRING(45),
      validate: {
        len: [1, 45],
      },
    },
  }, {
    sequelize,
    modelName: 'guiche',
    tableName: 'guiches',
  });
  return guiche;
};
