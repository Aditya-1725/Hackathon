import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getCalendarRequests } from "../../api/request.api";

const MaintenanceCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadCalendar();
  }, []);

  const loadCalendar = async () => {
    const res = await getCalendarRequests();

    const calendarEvents = res.data.map((req) => ({
      id: req._id,
      title: `${req.subject} (${req.equipment.name})`,
      date: req.scheduledDate,
    }));

    setEvents(calendarEvents);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Preventive Maintenance Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
};

export default MaintenanceCalendar;
