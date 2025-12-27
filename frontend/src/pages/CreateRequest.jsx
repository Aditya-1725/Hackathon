import { useEffect, useState } from "react";
import { getAllEquipment } from "../api/equipment.api";
import { createRequest } from "../api/request.api";

const CreateRequest = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    type: "corrective",
    equipment: "",
    scheduledDate: "",
    category: "IT",
  });

  useEffect(() => {
    getAllEquipment().then((res) => setEquipment(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createRequest(form);
      alert("Request created successfully");

      // ✅ RESET FORM CORRECTLY
      setForm({
        subject: "",
        type: "corrective",
        equipment: "",
        scheduledDate: "",
        category: "IT",
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to create request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Create Maintenance Request</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Problem subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
        />

        <select
          name="equipment"
          value={form.equipment}
          onChange={handleChange}
          required
        >
          <option value="">Select Equipment</option>
          {equipment.map((eq) => (
            <option key={eq._id} value={eq._id}>
              {eq.name}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="corrective">Corrective</option>
          <option value="preventive">Preventive</option>
        </select>

        {form.type === "preventive" && (
          <input
            type="date"
            name="scheduledDate"
            value={form.scheduledDate}
            onChange={handleChange}
            required
          />
        )}

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="IT">IT</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Electrical">Electrical</option>
          <option value="Vehicle">Vehicle</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;
