import React from "react";
import { Card, Col, ListGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { CAR_ROUTE } from "../utils";

const CarItem = ({ device }) => {
  const history = useNavigate();

  return (
    <Col
      md={3}
      className={"mt-3"}
      // onClick={() => history(CAR_ROUTE + "/" + device.id)}
    >
      <Card style={{ width: 500, cursor: "pointer" }} border={"light"}>
        <Image
          width={"auto"}
          height={"auto"}
          src={process.env.REACT_APP_API_URL + device.img}
        />

        <ListGroup className="text-black-50 d-flex justify-content-between aligh-items-center">
          <ListGroup.Item>Plate: {device.name}</ListGroup.Item>
          <ListGroup.Item>Model: {device.model}</ListGroup.Item>
          <ListGroup.Item>MOT end day: {device.MOTendDay}</ListGroup.Item>
          <ListGroup.Item>
            Insurance end date: {device.InsuranceEndDate}
          </ListGroup.Item>
          <ListGroup.Item>Fuel: {device.Fuel}</ListGroup.Item>
          <ListGroup.Item>
            Ownershiptype: {device.OwnershipTtype}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default CarItem;
