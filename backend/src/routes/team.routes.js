import express from "express";
import {
  createTeam,
  addMemberToTeam,
  getTeams,
} from "../controllers/team.controller.js";

const router = express.Router();

router.post("/", createTeam);
router.post("/add-member", addMemberToTeam);
router.get("/", getTeams);

export default router;
