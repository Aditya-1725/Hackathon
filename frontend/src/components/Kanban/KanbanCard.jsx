import { Draggable } from "@hello-pangea/dnd";

const KanbanCard = ({ request, index }) => {
  const isOverdue = request.isOverdue;

  return (
    <Draggable draggableId={request._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: "12px",
            marginBottom: "10px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: isOverdue ? "2px solid red" : "1px solid #ddd",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            position: "relative",
            fontSize: "13px",
            ...provided.draggableProps.style,
          }}
        >
          {/* OVERDUE */}
          {isOverdue && (
            <div
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                background: "red",
                color: "white",
                fontSize: "10px",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              OVERDUE
            </div>
          )}

          <div>
            <b>Problem:</b> {request.subject}
          </div>

          <div style={{ color: "#555", marginTop: "4px" }}>
            <b>Equipment:</b> {request.equipment?.name}
          </div>

          <div style={{ marginTop: "4px", fontSize: "12px" }}>
            <b>Technician:</b> {request.assignedTo?.name || "Unassigned"}
          </div>

          <div style={{ fontSize: "12px", color: "#555" }}>
            <b>Category:</b> {request.category}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
