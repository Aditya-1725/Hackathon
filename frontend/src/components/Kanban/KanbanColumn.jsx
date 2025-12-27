import { Droppable } from "@hello-pangea/dnd";
import KanbanCard from "./KanbanCard";

const KanbanColumn = ({ status, title, requests }) => {
  return (
    <div style={{ width: "250px" }}>
      <h3>{title}</h3>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: "400px",
              background: "#f4f5f7",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {requests.map((req, index) => (
              <KanbanCard
                key={req._id}
                request={req}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
