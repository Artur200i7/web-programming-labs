import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to="/profile">ЛР10 Auth</Link>
      </div>
      <nav>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>{user.email}</span>
            <button onClick={handleLogout}>Вийти</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>
              Увійти
            </Link>
            <Link to="/register">Зареєструватися</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
