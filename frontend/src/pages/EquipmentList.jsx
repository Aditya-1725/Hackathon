import { useEffect, useState } from "react";
import { getAllEquipment, createEquipment } from "../api/equipment.api";
import { useNavigate } from "react-router-dom";
import { getTeams } from "../api/team.api";

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  const [form, setForm] = useState({
    name: "",
    serialNumber: "",
    department: "",
    location: "",
    maintenanceTeam: "",
  });

  useEffect(() => {
    loadEquipment();
    getTeams().then((res) => setTeams(res.data));
  }, []);

  const loadEquipment = async () => {
    const res = await getAllEquipment();
    setEquipment(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEquipment(form);
    setShowForm(false);
    setForm({
      name: "",
      serialNumber: "",
      department: "",
      location: "",
      maintenanceTeam: "",
    });
    loadEquipment();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Equipment</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          marginBottom: "12px",
          padding: "6px 12px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {showForm ? "Cancel" : "+ Add Equipment"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            background: "#fafafa",
            maxWidth: "400px",
          }}
        >
          <input
            placeholder="Equipment Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Serial Number"
            name="serialNumber"
            value={form.serialNumber}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <select
            name="maintenanceTeam"
            value={form.maintenanceTeam}
            onChange={handleChange}
            required
          >
            <option value="">Select Maintenance Team</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            style={{
              marginTop: "8px",
              padding: "6px 12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Save Equipment
          </button>
        </form>
      )}

      {/* EQUIPMENT LIST */}
      {equipment.map((eq) => (
        <div
          key={eq._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "14px",
            marginBottom: "12px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              📦 {eq.name}
            </div>
            <div style={{ fontSize: "13px", color: "#555" }}>
              <div>
                <b>Department:</b> {eq.department}
              </div>
              <div>
                <b>Location:</b> {eq.location}
              </div>
              <div>
                <b>Status:</b>{" "}
                {eq.computedStatus === "Repairing" && (
                  <span style={{ color: "orange" }}>Repairing</span>
                )}
                {eq.computedStatus === "Repaired" && (
                  <span style={{ color: "green" }}>Repaired</span>
                )}
                {eq.computedStatus === "Scrapped" && (
                  <span style={{ color: "red" }}>Scrapped</span>
                )}
                {eq.computedStatus === "Active" && (
                  <span style={{ color: "blue" }}>Active</span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate(`/equipment/${eq._id}/requests`)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #2563eb",
              background: "#2563eb",
              color: "white",
            }}
          >
            Maintenance
          </button>
        </div>
      ))}
    </div>
  );
};

export default EquipmentList;
