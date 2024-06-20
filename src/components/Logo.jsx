import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import stylesSidebar from "./Sidebar.module.css";

function Logo({ className }) {
  return (
    <Link to="/" className={className ? className : ""}>
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
