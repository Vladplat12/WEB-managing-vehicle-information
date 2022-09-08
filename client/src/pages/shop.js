import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import CarList from "../components/CarList";
import TypeBar from "../components/TypeBar";
import { fetchBrands, fetchTypes, fetchCars } from "../http/CarAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setType(data));
    fetchBrands().then((data) => device.setBrand(data));
    fetchCars(null, null, 1, 2).then((data) => {
      device.setCar(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchCars(
      device.getSelectedType.id,
      device.getSelectedBrand.id,
      device.page,
      2
    ).then((data) => {
      device.setCar(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.getSelectedType, device.getSelectedBrand]);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <CarList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
