import React from 'react';
import actions from './../actions/GroceryItemActionCreator.jsx';

class GroceryAddItemList extends React.Component {
    constructor (props) {
      super(props);
      this.state = {input: props.input};
      this.handleInputName = this.handleInputName.bind(this);
      this.addItem = this.addItem.bind(this);
    }
    handleInputName (e) {
      this.setState({input: e.target.value})
    }
    addItem (e) {
      e.preventDefault();
      actions.add({
        name: this.state.input
      });
      this.setState({input: ""})
    }
    render() {
      return <div className='grocery-addItem'>
                <form onSubmit={this.addItem}>
                  <input value={this.state.input} onChange={this.handleInputName}/>
                  <button>Add Item</button>
                </form>
             </div>
    }
}
GroceryAddItemList.protoTypes = {input: React.PropTypes.string.isRequired};
GroceryAddItemList.defaultProps = { input: "" };
module.exports = GroceryAddItemList;
