'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class relatorioDiario extends Model {
    static associate(models) {
    }
  }

  relatorioDiario.init({}, {
    sequelize,
    modelName: 'relatorioDiario',
    tableName: 'relatorio_diario',
  });

  return relatorioDiario;
};
