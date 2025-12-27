import { useEffect, useState } from "react";
import { getAllUsers } from "../api/user.api";

const Teams = () => {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    getAllUsers().then((res) => {
      const techs = res.data.filter(
        (u) => u.role === "technician"
      );
      setTechnicians(techs);
    });
  }, []);

  return (
    <div className="page">
      <h2 style={{ marginBottom: "16px" }}>
        Technicians
      </h2>
      <p>Technicians count: {technicians.length}</p>


      {technicians.length === 0 && (
        <div className="card">
          <p className="text-muted">
            No technicians found
          </p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        {technicians.map((tech) => (
          <div key={tech._id} className="card">
            <div
              style={{
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              {tech.name}
            </div>

            <div style={{ marginTop: "8px" }}>
              <span className="badge badge-blue">
                Technician
              </span>
            </div>

            <div style={{ marginTop: "8px" }}>
              <span className="badge badge-green">
                {tech.category}
              </span>
            </div>

            <div
              className="text-muted"
              style={{ marginTop: "8px" }}
            >
              Team: {tech.team?.name || "Unassigned"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
