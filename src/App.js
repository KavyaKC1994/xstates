
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          ` https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((res) => {
          setStates(res.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((err) => {
          console.error("error fetching states:", err);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((res) => {
          setCities(res.data);
          setSelectedCity("");
        })
        .catch((err) => {
          console.error("error fetchong cities:", err);
        });
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="city-selector">
      <h1>select location</h1>
      <div className="dropdowns">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="dropdown"
        >
          <option value="" disabled>
            select country
          </option>
          {countries.map((country) => {
            return (
              <option value={country} key={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className={`dropdown ${selectedCountry ? "" : "fade"}`}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            select state
          </option>
          {states.map((state) => {
            return (
              <option value={state} key={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className={`dropdown ${selectedState ? "" : "fade"}`}
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select city
          </option>
          {cities.map((city) => {
            return (
              <option value={city} key={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity},</span>
          <span className="fade">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}
