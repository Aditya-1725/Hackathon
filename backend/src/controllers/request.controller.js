import MaintenanceRequest from "../models/MaintenanceRequest.model.js";
import Equipment from "../models/Equipment.model.js";
import User from "../models/User.model.js";

// CREATE REQUEST (AUTO-FILL TEAM)
// CREATE REQUEST (AUTO-ASSIGN RANDOM TECH OR UNASSIGNED)
export const createRequest = async (req, res) => {
  try {
    const { subject, type, equipment, scheduledDate, category } = req.body;

    // 1️⃣ Find equipment
    const eq = await Equipment.findById(equipment).populate("maintenanceTeam");
    if (!eq) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    // 2️⃣ Find technicians with same category
    const technicians = await User.find({
      role: "technician",
      category,
      team: eq.maintenanceTeam?._id,
    });

    // 3️⃣ Pick random technician OR keep unassigned
    let assignedTechnician = null;

    if (technicians.length > 0) {
      assignedTechnician =
        technicians[Math.floor(Math.random() * technicians.length)];
    }

    // 4️⃣ Create request safely
    const request = await MaintenanceRequest.create({
      subject,
      type,
      category,
      equipment: eq._id,
      team: eq.maintenanceTeam?._id || null,
      assignedTo: assignedTechnician ? assignedTechnician._id : null,
      scheduledDate: type === "preventive" ? scheduledDate : null,
      status: "new",
    });

    res.status(201).json({
      request,
      assignedTo: assignedTechnician
        ? assignedTechnician.name
        : "Unassigned",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ALL REQUESTS (KANBAN)
export const getRequests = async (req, res) => {
  const today = new Date();

  const requests = await MaintenanceRequest.find()
    .populate("equipment", "name")
    .populate("team", "name")
    .populate("assignedTo", "name");

  const updatedRequests = requests.map((req) => {
    if (
      req.type === "preventive" &&
      req.scheduledDate &&
      req.scheduledDate < today &&
      req.status !== "repaired"
    ) {
      req.isOverdue = true;
    } else {
      req.isOverdue = false;
    }
    return req;
  });

  res.json(updatedRequests);
};

// ASSIGN TECHNICIAN
export const assignTechnician = async (req, res) => {
  const { requestId, userId } = req.body;

  const request = await MaintenanceRequest.findById(requestId);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.assignedTo = userId;
  request.status = "in_progress";

  await request.save();
  res.json({ message: "Technician assigned" });
};

// UPDATE STATUS (KANBAN DRAG & DROP)
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, durationHours } = req.body;

  const request = await MaintenanceRequest.findById(id).populate("equipment");
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  request.status = status;

  // When moved to repaired or scrap
  if (status === "repaired" || status === "scrap") {
    request.closedAt = new Date();
  }

  if (status === "repaired") {
    request.durationHours = durationHours;
  }

  if (status === "scrap") {
    request.equipment.isScrapped = true;
    request.equipment.scrappedAt = new Date();
    await request.equipment.save();
  }

  await request.save();
  res.json({ message: "Status updated" });
};

// Trial for smart button
export const getRequestsByEquipment = async (req, res) => {
  const { equipmentId } = req.params;

  const requests = await MaintenanceRequest.find({
    equipment: equipmentId,
  })
    .populate("equipment", "name")
    .populate("team", "name")
    .populate("assignedTo", "name");

  res.json(requests);
};

//  SEnding the Request
export const getHistoryRequests = async (req, res) => {
  const requests = await MaintenanceRequest.find({
    status: { $in: ["repaired", "scrap"] },
  })
    .populate("equipment", "name")
    .populate("team", "name")
    .populate("assignedTo", "name")
    .sort({ closedAt: -1 }); // newest first

  res.json(requests);
};

// CALENDAR VIEW (PREVENTIVE)
export const getPreventiveRequests = async (req, res) => {
  const requests = await MaintenanceRequest.find({
    type: "preventive",
    scheduledDate: { $ne: null },
  }).populate("equipment");

  res.json(requests);
};
