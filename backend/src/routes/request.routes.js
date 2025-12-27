import express from "express";
import {
  createRequest,
  getRequests,
  assignTechnician,
  updateStatus,
  getPreventiveRequests,
  getRequestsByEquipment, 
  getHistoryRequests,
} from "../controllers/request.controller.js";

const router = express.Router();

router.post("/", createRequest);
router.get("/", getRequests);
router.post("/assign", assignTechnician);
router.patch("/:id/status", updateStatus);
router.get("/preventive/calendar", getPreventiveRequests);
router.get("/equipment/:equipmentId", getRequestsByEquipment);
router.get("/history", getHistoryRequests);



export default router;
