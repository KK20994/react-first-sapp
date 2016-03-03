import React from 'react';
import ReactDom from 'react-dom';
import GroceryItemList from './components/GroceryItemList.jsx';
import GroceryItemStore from './stores/GroceryItemStore.jsx';
var initial = GroceryItemStore.getList().items;
function render() {
  ReactDom.render(<GroceryItemList items={initial}/>, app);
}
GroceryItemStore.addChangeListener(function(){
  initial = GroceryItemStore.getList().items;
  render();
})
