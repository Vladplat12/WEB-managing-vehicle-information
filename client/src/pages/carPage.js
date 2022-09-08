import React, { useEffect, useState } from "react";
import { Container, Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneCar } from "../http/CarAPI";

const CarPage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();

  console.log(device.img);

  useEffect(() => {
    fetchOneCar(id).then((data) => setDevice(data));
  }, []);
  console.log(device);
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
          </Row>
        </Col>
      </Row>

      <Row className="d-flex flex-column m-3">
        <h1>Information</h1>

        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}:{info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default CarPage;
