import Team from "../models/Team.model.js";
import User from "../models/User.model.js";

// Create Team
export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;

    const team = await Team.create({ name });
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add member to team
export const addMemberToTeam = async (req, res) => {
  try {
    const { teamId, userId } = req.body;

    const team = await Team.findById(teamId);
    const user = await User.findById(userId);

    if (!team || !user) {
      return res.status(404).json({ message: "Team or User not found" });
    }

    team.members.push(user._id);
    user.team = team._id;

    await team.save();
    await user.save();

    res.json({ message: "User added to team" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeams = async (req, res) => {
  const teams = await Team.find();

  const result = [];

  for (const team of teams) {
    const members = await User.find({
      team: team._id,
    }).select("name role category");

    result.push({
      ...team.toObject(),
      members,
    });
  }

  res.json(result);
};
