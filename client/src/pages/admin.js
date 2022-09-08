import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateCar from "../components/modals/CreateCar";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
  const [showType, setTypeShow] = useState(false);
  const [showBrand, setBrandShow] = useState(false);
  const [showCar, setCarShow] = useState(false);

  const handleTypeClose = () => setTypeShow(false);
  const handleTypeShow = () => setTypeShow(true);

  const handleBrandClose = () => setBrandShow(false);
  const handleBrandShow = () => setBrandShow(true);

  const handleCarClose = () => setCarShow(false);
  const handleCarShow = () => setCarShow(true);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={handleTypeShow}
      >
        Add type
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={handleBrandShow}
      >
        Add brand
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={handleCarShow}
      >
        Add car
      </Button>
      <CreateBrand show={showBrand} onHide={handleBrandClose} />
      <CreateCar show={showCar} onHide={handleCarClose} />
      <CreateType show={showType} onHide={handleTypeClose} />
    </Container>
  );
};

export default Admin;
