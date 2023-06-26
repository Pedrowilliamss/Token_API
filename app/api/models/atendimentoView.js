'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class atendimentoView extends Model {
    static associate(models) {
    }
  }

  atendimentoView.init({}, {
    sequelize,
    modelName: 'atendimentoView',
    tableName: 'atendimento_view',
  });

  return atendimentoView;
};
