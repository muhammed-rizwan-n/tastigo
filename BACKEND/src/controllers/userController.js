const user = require("../models/user.js");

const getUsers = async (req, res) => {
  try {
    const users = await user.find({ username: req.body.username });
    console.log(users, req.body);
    if (!users || users.length === 0 || users[0].password !== req.body.password) {
      return res.status(404).json({ message: "Invalid Username or Password" });
    }
    else{
        return res.status(200).json({ message: "Login Successful"});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers };