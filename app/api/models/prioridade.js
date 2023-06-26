'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class prioridade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prioridade.hasMany(models.senha, {
        foreignKey: 'id_prioridade',
      });
    }
  }
  prioridade.init({
    prioridade: {
      type: DataTypes.STRING(2),
      validate: {
        len: [1, 2],
      },
    },
  }, {
    sequelize,
    modelName: 'prioridade',
    tableName: 'prioridades',
  });
  return prioridade;
};
