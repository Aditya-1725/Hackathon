import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #38bdf8, #0284c7)",
        padding: "14px 24px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT NAV */}
      <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: "18px" }}>
          GearGuard
        </span>

        <Link to="/create-request">Create Request</Link>

        {user && (
          <>
            <Link to="/">Dashboard</Link>

            {(user.role === "technician" ||
              user.role === "manager") && (
              <>
                <Link to="/kanban">Kanban</Link>
                <Link to="/history">History</Link>
              </>
            )}

            {user.role === "manager" && (
              <>
                <Link to="/equipment">Equipment</Link>
                <Link to="/calendar">Calendar</Link>
                <Link to="/teams">Teams</Link>
              </>
            )}
          </>
        )}

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>

      {/* RIGHT USER */}
      {user && (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "14px" }}>
            {user.name} · {user.role}
          </span>
          <button
            className="btn-outline"
            style={{ color: "white", borderColor: "white" }}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
