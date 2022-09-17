const mongoose = require("mongoose");

const mongoUrl = "mongodb://localhost:27017/YammieDB";

const orderSchema = new mongoose.Schema({
    date: Date,
    items:{type: [String], default: []}, 
    status: {
      type: String,
      enum : ["PENDING", "DELIVERED", "CANCELED"],
      default: 'PENDING'},
    price: Number,
  });

  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
  });

  module.exports = mongoose.model('Order', orderSchema);  
