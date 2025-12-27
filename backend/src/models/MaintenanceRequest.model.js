import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["corrective", "preventive"],
      required: true,
    },

    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["new", "in_progress", "repaired", "scrap"],
      default: "new",
    },

    scheduledDate: {
      type: Date, // For preventive maintenance
    },

    durationHours: {
      type: Number, // Filled when repaired
    },
    closedAt: {
      type: Date,
    },
    isOverdue: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["IT", "Mechanical", "Electrical", "Vehicle"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
