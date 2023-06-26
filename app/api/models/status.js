'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      status.hasMany(models.senha, {
        foreignKey: 'id_status',
      });
      status.hasMany(models.atendimento, {
        foreignKey: 'id_status',
      });
    }
  }
  status.init({
    nome: {
      type: DataTypes.STRING(45),
      validate: {
        len: [1, 45],
      },
    },
  }, {
    sequelize,
    modelName: 'status',
    tableName: 'status',
  });
  return status;
};
