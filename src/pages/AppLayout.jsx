import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import User from "../components/User";

const AppLayout = () => {
  return (
    <section className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </section>
  );
};

export default AppLayout;
