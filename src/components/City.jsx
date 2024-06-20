import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import styles from "./City.module.css";
import Spinner from "./Spinner";
import { useCitiesContext } from "../contexts/CitiesContext";
import ButtonBack from "./ButtonBack";

const formatDate = (date) =>
  new Intl.DateTimeFormat("pt-br", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { state, getCity } = useCitiesContext();

  const { loading, currentCity } = state;

  React.useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  if (loading) return <Spinner />;

  if (!currentCity) return null;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>Cidade</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>Você foi a {cityName} em</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Notas Sobre</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Leia mais em</h6>
        <a
          href={`https://pt.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Conheça mais sobre {cityName} no Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
