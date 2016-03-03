
import React from 'react';
import GroceryItem from './GroceryItem.jsx';
import GroceryAddItemList from './GroceryListAddItem.jsx';

class GroceryItemList extends React.Component {
  render() {
    return  <div>
              <h1>Grocery Listify</h1>
              <div>{this.props.items.map((item,index)=> <GroceryItem item={item} key={"item"+ index}/>)}</div>
              <GroceryAddItemList />
            </div>;
  }
}

module.exports = GroceryItemList;
