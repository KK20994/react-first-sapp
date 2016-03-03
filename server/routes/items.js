module.exports = function(app) {
  var GroceryItem = require('./../models/GroceryItems.js');
  app.route('/api/items')
  .get(function(req, res) {
    GroceryItem.find((error,doc)=>{
      res.send(doc);
    })
  })
  .post(function(req, res){
    var item = req.body;
    new GroceryItem(item).save((error, data) => {
      res.status(201).send(data);
    });
  });

  app.route('/api/items/:id')
  .delete(function(req,res){
    GroceryItem.findOne({
      _id:req.params.id
    }, function(error, doc) {
      doc.remove();
      res.status(200).send();
    })
  })
  .patch(function(req,res){
    GroceryItem.findOne({
      _id:req.body._id
    }, function(error, doc){
      for(var key in req.body){
        doc[key] = req.body[key];
      }
      doc.save();
      res.status(200).send(doc);
    })
  })
}
