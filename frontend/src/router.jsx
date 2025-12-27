import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EquipmentList from "./pages/EquipmentList";
import Kanban from "./pages/Kanban";
import Calendar from "./pages/Calendar";
import CreateRequest from "./pages/CreateRequest";
import EquipmentRequests from "./pages/EquipmentRequests";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Teams from "./pages/Teams";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/equipment"
        element={
          <RoleRoute roles={["manager"]}>
            <EquipmentList />
          </RoleRoute>
        }
      />

      <Route
        path="/kanban"
        element={
          <RoleRoute roles={["technician", "manager"]}>
            <Kanban />
          </RoleRoute>
        }
      />
      <Route
        path="/teams"
        element={
          <RoleRoute roles={["manager"]}>
            <Teams />
          </RoleRoute>
        }
      />

      <Route
        path="/calendar"
        element={
          <RoleRoute roles={["manager", "technician"]}>
            <Calendar />
          </RoleRoute>
        }
      />

      <Route
        path="/history"
        element={
          <RoleRoute roles={["technician", "manager"]}>
            <History />
          </RoleRoute>
        }
      />

      <Route path="/create-request" element={<CreateRequest />} />

      <Route
        path="/equipment/:id/requests"
        element={
          <ProtectedRoute>
            <EquipmentRequests />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
