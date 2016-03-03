import React from 'react';
import actions from './../actions/GroceryItemActionCreator.jsx';

class GroceryItem extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.togglePurchased = this.togglePurchased.bind(this);
  }
  togglePurchased (e) {
    e.preventDefault();
    if(this.props.item.purchased)
      actions.unBuy(this.props.item);
    else
      actions.buy(this.props.item);
  }
  delete (e) {
    e.preventDefault();
    actions.delete(this.props.item);
  }
  render() {
    return  <div className="grocery-item row">
              <div className="six columns">
                <h4 className={this.props.item.purchased ? "strikethrough" : "" }>
                  {this.props.item.name}
                </h4>
              </div>
              <form onSubmit={this.togglePurchased} className="three columns">
                <button className={this.props.item.purchased ? "" : "button-primary"}>{this.props.item.purchased ? "unbuy" : "buy"}</button>
              </form>
              <form className="three columns" onSubmit={this.delete}>
                <button>&times;</button>
              </form>
            </div> ;
  }
}
module.exports = GroceryItem;
