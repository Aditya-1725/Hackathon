import { useState } from "react";
import { signup } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "technician",
    category: "IT",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(form);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="technician">Technician</option>
          <option value="manager">Manager</option>
        </select>

        {form.role === "technician" && (
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
        )}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
