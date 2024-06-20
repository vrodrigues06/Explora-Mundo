import React from "react";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCitiesContext } from "../contexts/CitiesContext";

const CountriesList = () => {
  const { state } = useCitiesContext();
  const { cities, loading } = state;
  const [countries, setCountries] = React.useState([]);
  React.useEffect(() => {
    const countriesArray = cities.map((city) => city.country);
    const emojisArray = cities.map((city) => city.emoji);

    const uniqueCountries = [...new Set(countriesArray)];
    const uniqueEmojis = [...new Set(emojisArray)];

    const finalArray = uniqueCountries.map((country, idx) => ({
      country,
      emoji: uniqueEmojis[idx],
    }));

    setCountries(finalArray);
  }, [cities]);

  if (loading) return <Spinner />;

  if (!cities.length) return <Message message="Nenhum país visitado ainda." />;

  return (
    <ul className={`${styles.countryList} container`}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
};

export default CountriesList;
