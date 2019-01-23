'use strict';
const attrRestraintMap = require('./app/public/attrRestraint');
const pokedexMap = require('./app/public/pokedex');
const charactorMap = require('./app/public/charactor');
const translate = require('./app/public/translate');
const move = require('./app/public/move');

module.exports = app => {
  app.beforeStart(() => {
    app.attrRestraintMap = attrRestraintMap;
    app.pokedexMap = pokedexMap;
    app.charactorMap = charactorMap;
    app.translate = translate;
    app.move = Object.values(move).reduce((pre, mv) => Object.assign(pre, { [mv.englishName]: mv }), {});
  });
};
