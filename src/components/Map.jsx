import React from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

const brasil = [-15.793889, -47.882778];

const Map = () => {
  const { state } = useCitiesContext();
  const { cities } = state;
  const {
    isLoading,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = React.useState(brasil);

  const cityLat = searchParams.get("lat");
  const cityLng = searchParams.get("lng");

  React.useEffect(() => {
    if (cityLat && cityLng) setMapPosition([cityLat, cityLng]);
  }, [cityLat, cityLng]);

  React.useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <section className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button classes="position" onClick={getPosition}>
          {isLoading ? "Carregando..." : "Use sua Localização"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const { lat, lng } = city.position;
          const position = [lat, lng];

          return (
            <Marker key={city.id} position={position}>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </section>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
