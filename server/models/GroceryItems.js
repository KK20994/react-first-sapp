var mongoose = require('mongoose');

var GroceryItemSchema = {
  name:String,
  purchased:Boolean,
  id:String
}

var GroceryItem = mongoose.model("GroceryItem", GroceryItemSchema, "groceryitems");

module.exports = GroceryItem;
