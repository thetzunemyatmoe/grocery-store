import mongoose from "mongoose";

const grocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ['grams', 'kilograms', 'milliliters', 'liters', 'pieces', 'packs', 'bottles', 'cans', 'boxes', 'others'],
    required: true
  },
  category: {
    type: String,
    enum: ['Dairy', 'Vegetables', 'Fruits', 'Meat', 'Seafood', 'Grains', 'Legumes', 'Snacks', 'Beverages', 'Frozen Foods', 'Spices', 'Condiments', 'Oils', 'Bakery', 'Other'],
    required: false
  },
  purchasedDate: {
    type: Date,
    default: Date.now
  },
  expirationDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !this.purchasedDate || value >= this.purchasedDate;
      },
      message: "Expiration date must be later than or equal to the purchase date"
    }
  },
});

const Grocery = mongoose.model("Grocery", grocerySchema)

export default Grocery;