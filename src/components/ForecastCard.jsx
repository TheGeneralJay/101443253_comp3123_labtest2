import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const ForecastCard = (props) => {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [forecast, setForecast] = useState("");

    useEffect(() => {
        updateValues();
    });

    const updateValues = () => {
        setCity(props.city);
        setCountry(props.country);
        setForecast(props.forecast);
    }

    if (forecast !== "") {
        return (
            <Container className="card-container">
                <Row>
                    <div className="city-hdr">
                        <h3 className="city-name">{city.toUpperCase()}, {country.toUpperCase()}</h3>
                        <hr />
                    </div>
                    {forecast.map((date) => 
                        <Col className="forecast-card">
                            <h4>{date.date}</h4>
                            <Image src={`${date.day.condition.icon}`} /> <br />
                            <span className="weather-desc">{date.day.condition.text}</span>
                            <hr />
                            <Col className="temp-box">
                                <span className="temp">Average: {date.day.avgtemp_c} °C</span> <br />
                                <span className="temp">Maximum: {date.day.maxtemp_c} °C</span>
                            </Col>
                            <hr />
                            <Col className="astro">
                                <span className="astro-txt">Sunrise: {date.astro.sunrise}</span> <br />
                                <span className="astro-txt">Sunrise: {date.astro.sunset}</span>
                            </Col>
                        </Col>
                    )}
                </Row>
            </Container>
        );
    }
}

export default ForecastCard;