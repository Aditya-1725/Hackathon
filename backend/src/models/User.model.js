import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["technician", "manager"],
      required: true,
    },

    // ✅ CATEGORY ONLY FOR TECHNICIAN
    category: {
      type: String,
      enum: ["IT", "Mechanical", "Electrical", "Vehicle"],
      required: function () {
        return this.role === "technician";
      },
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
