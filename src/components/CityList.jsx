import React from "react";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCitiesContext } from "../contexts/CitiesContext";

const CityList = () => {
  const { state, deleteCity } = useCitiesContext();

  const { cities, loading } = state;

  if (loading) return <Spinner />;

  function handleDeleteCity(id) {
    deleteCity(id);
  }

  if (!cities.length)
    return <Message message="Adicione sua primeira cidade ao clicar no mapa" />;

  return (
    <ul className={`${styles.cityList} container`}>
      {cities.map((city) => (
        <CityItem
          key={city.id}
          city={city}
          handleDeleteCity={handleDeleteCity}
        />
      ))}
    </ul>
  );
};

export default CityList;
