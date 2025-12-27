import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "./KanbanColumn";
import { getAllRequests, updateRequestStatus } from "../../api/request.api";

const statuses = [
  { key: "new", label: "New" },
  { key: "in_progress", label: "In Progress" },
  { key: "repaired", label: "Repaired" },
  { key: "scrap", label: "Scrap" },
];

const KanbanBoard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await getAllRequests();
    setRequests(res.data);
  };

  const ONE_DAY = 24 * 60 * 60 * 1000;

  const visibleRequests = requests.filter((r) => {
    // Always show active work
    if (r.status === "new" || r.status === "in_progress") return true;

    // For repaired / scrap → show only for 1 day
    if ((r.status === "repaired" || r.status === "scrap") && r.closedAt) {
      return Date.now() - new Date(r.closedAt).getTime() < ONE_DAY;
    }

    return false;
  });

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    // Ask confirmation for critical states
    if (newStatus === "repaired" || newStatus === "scrap") {
      const ok = window.confirm(
        `Are you sure you want to move this request to ${newStatus.toUpperCase()}?`
      );

      if (!ok) return;
    }

    await updateRequestStatus(draggableId, {
      status: newStatus,
    });

    fetchRequests();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
        }}
      >
        {statuses.map((col) => (
          <KanbanColumn
            key={col.key}
            status={col.key}
            title={col.label}
            requests={visibleRequests.filter((r) => r.status === col.key)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
