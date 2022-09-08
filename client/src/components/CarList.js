import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../index";
import CarItem from "./CarItem";

const CarList = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex ">
      <div className="mt-2 mb-2">
        {device.cars.map((car) => (
          <CarItem key={car.id} device={car} />
        ))}
      </div>
    </Row>
  );
});

export default CarList;
