import { useState } from "react";
import React from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useNavigate, useSearchParams } from "react-router-dom";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCitiesContext } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const API_URL = "https://api-bdc.net/data/reverse-geocode";
const API_KEY = "bdc_85a5b61d265e44d3b7ace4e30ed0aad8";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [searchParams] = useSearchParams();
  const [errorGeocoding, setErrorGeocoding] = React.useState(false);
  const [loadingGeocoding, setLoadingGeocoding] = React.useState(false);
  const [emoji, setEmoji] = React.useState("");
  const { createCity, state } = useCitiesContext();
  const { loading } = state;
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  React.useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setLoadingGeocoding(true);
        setErrorGeocoding(false);
        const response = await fetch(
          `${API_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=pt-BR&key=${API_KEY}`
        );

        if (!response.ok) throw new Error("Ocorreu um erro na requisição");

        const data = await response.json();
        if (!data.countryCode)
          throw new Error(
            "Isso não parece ser uma cidade, tente novamente clicando em algum outro lugar!"
          );
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErrorGeocoding(err.message);
      } finally {
        setLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmitAddCities(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);

    navigate("/app/cities");
  }

  if (loadingGeocoding) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Começe clicando em uma cidade no Mapa!" />;
  if (errorGeocoding) return <Message message={errorGeocoding} />;

  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""} container`}
      onSubmit={handleSubmitAddCities}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">Cidade</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">Quando você irá para {cityName}?</label>
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notas sobre a viagem para {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button classes="primary">Adicionar</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
