import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";
import React from "react";

const FAKE_USER = {
  name: "Vitor",
  email: "vitor@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user === null) navigate("/login");
  }, [user, navigate]);

  function handleClick(e) {
    e.preventDefault();

    logout();
    navigate("/");
  }
  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Bem-vindo, {user.name}</span>
      <button onClick={handleClick}>Sair</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
