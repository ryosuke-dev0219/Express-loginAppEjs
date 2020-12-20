'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const now = new Date();
    return queryInterface.bulkInsert('todo_items', [
      { user_id: 1 ,  seq: 1, todo: 'テストを行う', done:false, delete:false, createdAt: now, updatedAt: now},
      { user_id: 1 ,  seq: 2, todo: '買い物行く', done:false, delete:false, createdAt: now, updatedAt: now},
      { user_id: 1 ,  seq: 3, todo: '早く寝る', done:false, delete:false, createdAt: now, updatedAt: now},
      { user_id: 2 ,  seq: 1, todo: '勉強する', done:false, delete:false, createdAt: now, updatedAt: now},
      { user_id: 3 ,  seq: 1, todo: 'だらだら過ごす', done:false, delete:false, createdAt: now, updatedAt: now},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
