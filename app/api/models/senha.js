'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class senha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      senha.hasMany(models.atendimento, {
        foreignKey: 'id_senha',
      });
      senha.belongsTo(models.prioridade, {
        foreignKey: 'id_prioridade',
      });
      senha.belongsTo(models.status, {
        foreignKey: 'id_status',
      });
    }
  }
  senha.init({
    senha: {
      type: DataTypes.STRING(11),
      validate: {
        len: [1, 11],
      },
    },
    temp_criado: DataTypes.DATE,
    temp_atendido: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'senha',
    tableName: 'senhas',
  });
  return senha;
};
