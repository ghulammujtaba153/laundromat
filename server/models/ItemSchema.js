import mongoose from 'mongoose';

// Define the schema
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Not Available'],
    default: 'Available',
  },
  category: {
    type: String,
    enum: ['Washing Machine', 'Dryer'],
    required: true,
  },
  picture: {
    type: String, // You might want to store the path to the image
  },
});

// Create the Item model
const Item = mongoose.model('Item', itemSchema);

export default Item;
