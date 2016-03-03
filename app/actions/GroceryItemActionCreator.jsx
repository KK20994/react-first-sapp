import AppDispatcher from './../AppDispatcher.js';
var GroceryItemActionCreator = {
  add: function(item) {
    AppDispatcher.handleViewAction({
      item: item,
      actionType: "grocery-item:add"
    })
  },
  unBuy: function(item) {
    AppDispatcher.handleViewAction({
      item: item,
      actionType: "grocery-item:unBuy"
    })
  },
  buy: function(item) {
    AppDispatcher.handleViewAction({
      item: item,
      actionType: "grocery-item:buy"
    })
  },
  delete: function(item) {
    AppDispatcher.handleViewAction({
      item: item,
      actionType: "grocery-item:delete"
    })
  }
}

module.exports  = GroceryItemActionCreator;
