const mongoose = require("mongoose");

img = "https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBzbmFja3xlbnwxfHx8fDE3NjAzNjM2MzB8MA&ixlib=rb-4.1.0&q=80&w=1080";
/*
Data in this format will be stored in the database
      id: 12,
      name: "Crispy Samosa",
      price: 30,
      image: "https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBzbmFja3xlbnwxfHx8fDE3NjAzNjM2MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Snacks",
      isVeg: true,
      isSpicy: true,
      isChefSpecial: false,
*/

const menuItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: img},
  category: { type: String, required: true },
  isVeg: {type: Boolean, default: true },
  isSpicy: { type: Boolean, default: false },
  isChefSpecial: { type: Boolean, default: false },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
