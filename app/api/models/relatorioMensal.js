'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class relatorioMensal extends Model {
    static associate(models) {
    }
  }

  relatorioMensal.init({}, {
    sequelize,
    modelName: 'relatorioMensal',
    tableName: 'relatorio_mensal',
  });

  return relatorioMensal;
};
