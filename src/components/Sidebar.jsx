import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import CityList from "./CityList";
import CountriesList from "./CountriesList";
import City from "./City";
import Form from "./Form";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo className={styles.sidebarLogo} />
      <AppNav />
      <Routes>
        <Route index element={<Navigate to="cities" replace />} />
        <Route path="cities" element={<CityList />} />
        <Route path="/cities/:id" element={<City />} />
        <Route path="countries" element={<CountriesList />} />
        <Route path="form" element={<Form />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Sidebar;
