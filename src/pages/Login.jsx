import React from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuthContext } from "../contexts/FakeAuthContext";
import Button from "../components/Button";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = React.useState("vitor@example.com");
  const [password, setPassword] = React.useState("qwerty");
  const [loading, setLoading] = React.useState(false);
  const state = useAuthContext();
  const { login, isAuthenticated, error } = state;
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated) navigate("/app", { replace: true });
    }, 1000);
  }, [isAuthenticated, navigate]);

  function handleSubmitLogin(e) {
    e.preventDefault();

    login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={`${styles.form} container`} onSubmit={handleSubmitLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button classes="primary">{loading ? "Logando..." : "Login"}</Button>
          {error ? (
            <span
              style={{
                color: "#ef4444",
                fontSize: "1.5rem",
                display: "inline-block",
                marginLeft: "1rem",
              }}
            >
              {error}
            </span>
          ) : (
            ""
          )}
        </div>
      </form>
    </main>
  );
}
