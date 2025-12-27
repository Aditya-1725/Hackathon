import User from "../models/User.model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find()
    .populate("team", "name")
    .select("name role category team");

  res.json(users);
};
