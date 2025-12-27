import express from "express";
import {
  createEquipment,
  getEquipment,
  scrapEquipment,
} from "../controllers/equipment.controller.js";

const router = express.Router();

router.post("/", createEquipment);
router.get("/", getEquipment);
router.patch("/:id/scrap", scrapEquipment);

export default router;
