const MenuItem = require("../models/menuItem.js");

const getMenu = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateMenuItem = async (req, res) => {
        console.log(req.params.id, req.body);

    try {
        const updateMenuItem = await MenuItem.findOneAndUpdate({ id: parseInt(req.params.id)}, req.body);
        if (!updateMenuItem) {
            return res.status(404).json({ message: "Menu Item not found" });
        }
        res.status(200).json(updateMenuItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deletedItem) {
      return res.status(404).json({ message: "Menu Item not found" });
    }
    res.status(200).json({ message: "Menu Item deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = { getMenu, addMenuItem, updateMenuItem ,deleteMenuItem};