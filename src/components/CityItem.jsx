import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCitiesContext } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("pt-br", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city, handleDeleteCity }) => {
  const { state } = useCitiesContext();
  const { currentCity } = state;

  const { cityName, emoji, date, position } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === city.id ? styles.cityItemActive : ""
        }`}
        to={`${city.id}/?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleDeleteCity(city.id);
          }}
          className={styles.deleteBtn}
        >
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
