import React, { useContext, useState, useEffect } from "react";
import { Form, Dropdown, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../index";
import { createCar, fetchBrands, fetchTypes } from "../../http/CarAPI";
import { observer } from "mobx-react-lite";

const CreateCar = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [year, setYear] = useState(2022);
  const [model, setModel] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [MOTendDay, setMOTendDay] = useState("");
  const [InsuranceEndDate, setInsuranceEndDate] = useState("");
  const [Fuel, setFuel] = useState("");
  const [OwnershipTtype, setOwnershipTtype] = useState("");

  useEffect(() => {
    fetchTypes().then((data) => device.setType(data));
    fetchBrands().then((data) => device.setBrand(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addCar = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("model", model);
    formData.append("model_year", `${year}`);
    formData.append("img", file);
    formData.append("typeId", device.getSelectedType.id);
    formData.append("brandId", device.getSelectedBrand.id);
    formData.append("info", JSON.stringify(info));
    formData.append("MOTendDay", MOTendDay);
    formData.append("InsuranceEndDate", InsuranceEndDate);
    formData.append("Fuel", Fuel);
    formData.append("OwnershipTtype", OwnershipTtype);
    createCar(formData).then((data) => onHide());
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">Add Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>
                {device.getSelectedType.name || "Choose type"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map((type) => (
                  <Dropdown.Item
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                  >
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle>
                {device.getSelectedBrand.name || "Choose brand"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map((brand) => (
                  <Dropdown.Item
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                  >
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="mt-2 mb-2"
              placeholder="Enter model"
            />
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 mb-2"
              placeholder="Enter new plate (xx-xxx-xx or xxx-xx-xxx)"
            />
            <Form.Control
              value={MOTendDay}
              onChange={(e) => setMOTendDay(e.target.value)}
              className="mt-2 mb-2"
              placeholder="Enter MOT end day"
            />
            <Form.Control
              value={Fuel}
              onChange={(e) => setFuel(e.target.value)}
              className="mt-2 mb-2"
              placeholder="Enter fuel"
            />
            <Form.Control
              value={OwnershipTtype}
              onChange={(e) => setOwnershipTtype(e.target.value)}
              className="mt-2 mb-2"
              placeholder="Enter Ownership type"
            />

            <Form.Control
              value={InsuranceEndDate}
              onChange={(e) => setInsuranceEndDate(e.target.value)}
              className="mt-2 mb-2"
              placeholder="Enter Insurance End Date"
            />
            <Form.Control
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="mt-2 mb-2"
              placeholder="Enter year"
            />
            <Form.Control
              className="mt-2 mb-2"
              type="file"
              onChange={selectFile}
            />
            <hr />
            <Button variant={"outline-dark"} onClick={addInfo}>
              Add information
            </Button>
            {info.map((i) => (
              <Row className="mt-4" key={i.number}>
                <Col md={4}>
                  <Form.Control
                    value={i.title}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, i.number)
                    }
                    placeholder="Info type"
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    value={i.description}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, i.number)
                    }
                    placeholder="Add information"
                  />
                </Col>
                <Col md={4}>
                  <Button
                    onClick={() => removeInfo(i.number)}
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={addCar}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateCar;
