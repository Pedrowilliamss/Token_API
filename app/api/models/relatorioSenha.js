'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class relatorioSenha extends Model {
    static associate(models) {
    }
  }

  relatorioSenha.init({}, {
    sequelize,
    modelName: 'relatorioSenha',
    tableName: 'relatorio_senha',
  });

  return relatorioSenha;
};
