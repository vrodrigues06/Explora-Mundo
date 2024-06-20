import React from "react";

const CitiesContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading/start":
      return { ...state, loading: true };
    case "loading/end":
      return { ...state, loading: false };
    case "cities/loaded":
      return { ...state, cities: action.payload };
    case "cities/get":
      return { ...state, currentCity: action.payload };
    case "cities/create":
      return { ...state, cities: [...state.cities, action.payload] };
    case "cities/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  loading: false,
  currentCity: "",
  cities: [],
};

// *ACTIONS

function loadingStart() {
  return { type: "loading/start" };
}

function loadingEnd() {
  return { type: "loading/end" };
}

function citiesLoaded(data) {
  return { type: "cities/loaded", payload: data };
}

function citiesGet(city) {
  return { type: "cities/get", payload: city };
}

function citiesCreate(newCity) {
  return { type: "cities/create", payload: newCity };
}

function citiesDelete(id) {
  return { type: "cities/delete", payload: id };
}

function CitiesProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const BASE_URL = "https://exploramundo.netlify.app/api";

  React.useEffect(() => {
    async function fetchCities() {
      try {
        dispatch(loadingStart());

        const response = await fetch(`${BASE_URL}/cities`);

        const data = await response.json();

        dispatch(citiesLoaded(data));

        if (!response.ok)
          throw new Error(
            "Não foi possível completar a requisição, Tente novamente!"
          );
      } catch (err) {
        console.error(err.message);
      } finally {
        dispatch(loadingEnd());
      }
    }
    fetchCities();
  }, []);

  const getCity = React.useCallback(
    async function getCity(id) {
      if (Number(id) === state.currentCity.id) return;
      try {
        dispatch(loadingStart());
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();

        if (!response.ok)
          throw new Error("Não foi possível obter informações sobre a cidade");

        dispatch(citiesGet(data));
      } catch (err) {
        console.error(err.message);
      } finally {
        dispatch(loadingEnd());
      }
    },
    [state.currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch(loadingStart());
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();

      if (!response.ok)
        throw new Error("Não foi possível enviar as informações");

      dispatch(citiesCreate(data));
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch(loadingEnd());
    }
  }

  async function deleteCity(id) {
    try {
      dispatch(loadingStart());
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(citiesDelete(id));

      if (!response.ok) throw new Error("Não foi possível Deletar");
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch(loadingEnd());
    }
  }

  const contextData = {
    state,
    getCity,
    createCity,
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={contextData}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  const citiesContext = React.useContext(CitiesContext);
  if (citiesContext === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return citiesContext;
}

export { useCitiesContext, CitiesProvider };
