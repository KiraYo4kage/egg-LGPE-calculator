'use strict';

const attrRestraintMap = require('../public/attrRestraint');
const pokedexMap = require('../public/pokedex');
const charactorMap = require('../public/charactor');
const translate = require('../public/translate');

const helper = {
  createResponseObject: (data, message = '请求发生错误') => ({
    data: data ? data : null,
    message: data ? null : message,
  }),

  generateRamdonNumber: (min = 0, max = 1) => max - Math.random() * (max - min),

  translate: chinese => translate[chinese] || chinese,

  getBaseStatsByPm: pokemon => pokedexMap[pokemon].baseStats,
  /**
   * @param {String} skillAttr The attribute of skill
   * @param {String | Array} attackerAttr The attribute of attacker
   * @param {String | Array} defenderAttr The attribute of defender
   * @return {Number} Addition
   */
  calculateAddtion: (skillAttr, attackerAttr, defenderAttr) => {
    let addition = 1;
    if (typeof attackerAttr === 'string') {
      attackerAttr = [ attackerAttr ];
    }

    if (typeof defenderAttr === 'string') {
      defenderAttr = [ defenderAttr ];
    }

    if (attackerAttr.indexOf(skillAttr) > -1) {
      addition *= 1.5;
    }

    addition *= defenderAttr.reduce((acc, cur) => attrRestraintMap[skillAttr][Object.keys(attrRestraintMap).findIndex(attr => attr === cur)] * acc, 1);
    return addition;
  },

  calculateDamage: ({ power, level, attack, defence, skillAttr, attackerAttr, defenderAttr, min = 0.85, max = 1 }) => Math.floor(
    ((2 * level + 10) * attack * power / (250 * defence) + 2)
    * helper.calculateAddtion(skillAttr, attackerAttr, defenderAttr)
    * helper.generateRamdonNumber(min, max)
  ),

  calculateAbility: options => helper[`calculate${options.type === 'hp' ? 'Hp' : 'Normal'}Ability`](options),

  calculateHpAbility: ({ individual, species, level }) => Math.floor(
    (individual + (2 * species)) * level / 100 + 10 + level
  ),

  calculateNormalAbility: ({ individual, species, level, charactor, type }) => Math.floor(
    ((individual + (2 * species)) * level / 100 + 5) * helper.calculateCharactorAmend(type, charactor)
  ),

  calculateCharactorAmend: (type, charactor) => {
    return charactorMap[charactor].increase === type ? 1.1 :
      charactorMap[charactor].decrease === type ? 0.9 : 1;
  },
};

module.exports = helper;
