import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
    },

    department: {
      type: String, // Production, IT, Admin, etc.
      required: true,
    },

    assignedTo: {
      type: String, // Employee name (optional)
    },

    maintenanceTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    purchaseDate: Date,
    warrantyExpiry: Date,

    location: {
      type: String,
      required: true,
    },
    scrappedAt: {
      type: Date,
    },

    isScrapped: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
