'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class senhaView extends Model {
    static associate(models) {
    }
  }

  senhaView.init({}, {
    sequelize,
    modelName: 'senhaView',
    tableName: 'senha_view',
  });

  return senhaView;
};
