import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequestsByEquipment } from "../api/request.api";

const EquipmentRequests = () => {
  const { id } = useParams();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequestsByEquipment(id).then((res) =>
      setRequests(res.data)
    );
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Maintenance Requests</h2>

      {requests.map((r) => (
        <div
          key={r._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "8px",
            borderRadius: "6px",
          }}
        >
          <strong>{r.subject}</strong>
          <div>Status: {r.status}</div>
        </div>
      ))}
    </div>
  );
};

export default EquipmentRequests;
