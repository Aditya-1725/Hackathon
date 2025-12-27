import Equipment from "../models/Equipment.model.js";
import MaintenanceRequest from "../models/MaintenanceRequest.model.js";

// Create equipment
export const createEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all equipment
export const getEquipment = async (req, res) => {
  const equipmentList = await Equipment.find().populate("maintenanceTeam");

  const result = [];

  for (const eq of equipmentList) {
    // Check scrap visibility window (2 days)
    if (eq.isScrapped && eq.scrappedAt) {
      const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;
      if (Date.now() - new Date(eq.scrappedAt).getTime() > TWO_DAYS) {
        continue; // ❌ hide from list
      }
    }

    // Find latest request for this equipment
    const lastRequest = await MaintenanceRequest.findOne({
      equipment: eq._id,
    }).sort({ createdAt: -1 });

    let status = "Active";

    if (eq.isScrapped) {
      status = "Scrapped";
    } else if (lastRequest) {
      if (lastRequest.status === "in_progress") {
        status = "Repairing";
      } else if (lastRequest.status === "repaired") {
        status = "Repaired";
      }
    }

    result.push({
      ...eq.toObject(),
      computedStatus: status, // 👈 frontend will use this
    });
  }

  res.json(result);
};
// Scrap equipment
export const scrapEquipment = async (req, res) => {
  const { id } = req.params;

  const equipment = await Equipment.findById(id);
  if (!equipment) {
    return res.status(404).json({ message: "Equipment not found" });
  }

  equipment.isScrapped = true;
  await equipment.save();

  res.json({ message: "Equipment scrapped successfully" });
};
