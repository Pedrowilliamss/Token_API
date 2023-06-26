'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class atendimento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      atendimento.belongsTo(models.status, {
        foreignKey: 'id_status',
      });
      atendimento.belongsTo(models.senha, {
        foreignKey: 'id_senha',
      });
      atendimento.belongsTo(models.guiche, {
        foreignKey: 'id_guiche',
      });
    }
  }
  atendimento.init({
    temp_inicio: DataTypes.DATE,
    temp_fim: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'atendimento',
    tableName: 'atendimentos',
  });
  return atendimento;
};
