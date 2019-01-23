'use strict';

const Controller = require('egg').Controller;

class DamageController extends Controller {
  async max() {
    const { body = {} } = this.ctx.request;
    const maxDamage = await this.ctx.service.damage.damage(Object.assign({ max: 1, min: 1 }, body));
    this.ctx.body = this.ctx.helper.createResponseObject({ maxDamage });
  }

  async min() {
    const { body = {} } = this.ctx.request;
    const minDamage = await this.ctx.service.damage.damage(Object.assign({ max: 0.85, min: 0.85 }, body));
    this.ctx.body = this.ctx.helper.createResponseObject({ minDamage });
  }

  async ability() {
    const { body = {} } = this.ctx.request;
    const ability = await this.ctx.service.damage.ability(Object.assign({ charactor: 'Hardy' }, body));
    this.ctx.body = this.ctx.helper.createResponseObject({ ability });
  }
}

module.exports = DamageController;
