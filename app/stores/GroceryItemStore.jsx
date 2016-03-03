import AppDispatcher from './../AppDispatcher.js';
import { EventEmitter } from 'events';
import RestHelper from './../helpers/RestHelper.js'
const CHANGE_EVENT = 'change';

// Define the store as an empty array
let _store = {
  items:  []
};


class GroceryItemStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getList() {
    return _store;
  }
}
const GroceryItemStore = new GroceryItemStoreClass();

AppDispatcher.register((payload) => {
  var split = payload.action.actionType.split(":"),
  index;
  if(split[0] === 'grocery-item') {
    switch (split[1]) {
      case 'add':
          RestHelper.post('api/items', payload.action.item).then(data=> {
            _store.items.push(data);
            GroceryItemStore.emit(CHANGE_EVENT);
          });
        break;
      case 'buy':
      case 'unBuy':
          payload.action.item.purchased =  payload.action.item.purchased? false: true;
          RestHelper.patch('api/items/' + payload.action.item._id, payload.action.item).then(function(data){
            index = _store.items.findIndex(_item => _item.name === data.name);
            _store.items[index] = data;
            GroceryItemStore.emit(CHANGE_EVENT);
          });
        break;
      case 'delete':
         index = _store.items.findIndex(_item => _item.name === payload.action.item.name);
         RestHelper.del('api/items/' + payload.action.item._id).then(function(){
           _store.items.splice(index, 1);
           GroceryItemStore.emit(CHANGE_EVENT);
         });
      default:
        return true;
    }
  }
});

RestHelper.get("api/items")
.then(function(data){
  _store.items = data;
  GroceryItemStore.emit(CHANGE_EVENT);
});

export default GroceryItemStore;
