'use strict';

const Service = require('egg').Service;

class DamageService extends Service {
  async damage({
    moveName = 'Metronome',
    attacker = {},
    defender = {},
    level = 50,
    max = 0.85,
    min = 0.85,
  }) {
    const { power, attribute: skillAttr } = this.app.move[moveName];
    const { attack, defence, attackerAttr, defenderAttr } = await this.ctx.service.damage.getAtkOrDefByMove(moveName, attacker, defender);
    return this.ctx.helper.calculateDamage({
      power,
      level,
      attack,
      defence,
      skillAttr: this.ctx.helper.translate(skillAttr),
      attackerAttr,
      defenderAttr,
      max,
      min,
    });
  }
  async ability({
    individual = {},
    pokemon = 'beeDrillMega',
    level = 50,
    charactor = 'Hardy',
  }) {
    const baseStats = this.ctx.helper.getBaseStatsByPm(pokemon);
    return Object.keys(baseStats).reduce((result, key) => Object.assign(result, {
      [key]: this.ctx.helper.calculateAbility({
        individual: individual[key] || 0,
        species: baseStats[key],
        level,
        charactor,
        type: key,
      }),
    }), {});
  }

  async getAtkOrDefByMove(moveName, attacker, defender) {
    const attackType = this.app.move[moveName].type === '物理' ? 'atk' : 'spa';
    const defenceType = this.app.move[moveName].type === '物理' ? 'def' : 'spd';
    const attackerAttr = this.app.pokedexMap[attacker.name].types;
    const defenderAttr = this.app.pokedexMap[defender.name].types;
    let customParam = {};
    switch (moveName) {
      case 'Foul Play':
        customParam = {
          attack: defender.ability[attackType] * (defender.abLevel[attackType] || 1),
        };
        break;
      default:
        break;
    }
    return Object.assign({
      attack: attacker.ability[attackType] * (attacker.abLevel[attackType] || 1),
      defence: defender.ability[defenceType] * (defender.abLevel[defenceType] || 1),
      attackerAttr,
      defenderAttr,
    }, customParam);
  }
}

module.exports = DamageService;
