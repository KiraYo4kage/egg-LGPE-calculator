'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/api/damage/max', 'damage.max');
  router.post('/api/damage/min', 'damage.min');
  router.post('/api/damage/ability', 'damage.ability');

};
