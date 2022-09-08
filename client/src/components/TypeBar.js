import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../";
import { ListGroup, Card } from "react-bootstrap";

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <ListGroup>
      {device.types.map((type) => (
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => device.setSelectedType(type)}
          key={type.id}
          border={type.id === device.setSelectedType.id ? "danger" : "light"}
        >
          {type.name}
        </Card>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
