import { useEffect, useState } from "react";
import { getHistoryRequests } from "../api/request.api";

const History = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getHistoryRequests().then((res) =>
      setRequests(res.data)
    );
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Maintenance History</h2>

      {requests.length === 0 && (
        <p>No historical requests yet.</p>
      )}

      {requests.map((r) => (
        <div
          key={r._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            background: "#fafafa",
          }}
        >
          <div>
            <b>Problem:</b> {r.subject}
          </div>
          <div>
            <b>Equipment:</b> {r.equipment?.name}
          </div>
          <div>
            <b>Status:</b>{" "}
            {r.status === "repaired" ? "Repaired" : "Scrapped"}
          </div>
          <div>
            <b>Technician:</b>{" "}
            {r.assignedTo?.name || "N/A"}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            Closed on:{" "}
            {r.closedAt
              ? new Date(r.closedAt).toLocaleString()
              : "—"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
