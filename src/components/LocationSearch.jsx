import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import API_URL from "../constants/apiUrl";
import ForecastCard from "./ForecastCard";

const LocationSearch = () => {
    const [city, setCity] = useState("");
    const [currentCity, setCurrentCity] = useState("");
    const [country, setCountry] = useState("");
    const [currentCountry, setCurrentCountry] = useState("");
    const [forecast, setForecast] = useState("");

    // Get forecast from the API. If it returns 400 due to an invalid city/country, alert user instead of
    // changing values.
    const getForecast = () => { 
        axios.get(`${API_URL.BASEURL}/forecast.json?${API_URL.APIKEY}&q=${city},${country}&days=3`, {
            validateStatus: function (status) {
                return status < 500;
            }
        })
        .then(res => {
            if (res.status !== 400) {
                setCurrentCity(city);
                setCurrentCountry(country);
                return setForecast(res.data.forecast.forecastday);
            } else {
                alert("Please make sure the city and country you wish to view were spelled correctly.");
            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getForecast();
    }

    return (
        <div className="application">
            <h1>3-Day Forecast Application</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="label">City</Form.Label>
                    <Form.Control
                    type="text"
                    required
                    placeholder="Enter a city..."
                    value={city}
                    onChange={item => {setCity(item.target.value)}}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="label">Country</Form.Label>
                    <Form.Control
                    type="text"
                    required
                    placeholder="Enter a country..."
                    value={country}
                    onChange={item => {setCountry(item.target.value)}}
                    />
                </Form.Group>

                <Button className="submit-btn" type="submit">Search</Button>
            </Form>

            <br />

            <ForecastCard city={currentCity} country={currentCountry} forecast={forecast} />
        </div>
    );
}

export default LocationSearch;