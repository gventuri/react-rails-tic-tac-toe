import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Card, Image } from "react-bootstrap";
import classNames from "classnames";

const ChooseSymbol = ({ isSelectedChoice, onChange }) => {
  const CHOOSE_OPTIONS = ["x", "o"];

  return (
    <Form.Group controlId="chooseSymbol">
      <Form.Label>Choose your symbol</Form.Label>
      <Row>
        {CHOOSE_OPTIONS.map((choice) => (
          <Col key={choice}>
            <Card
              className={classNames("card-choice", {
                selected: isSelectedChoice(choice),
              })}
              onClick={() => onChange(choice)}
            >
              <Card.Body className="text-center">
                <Image
                  title={`Option: ${choice}`}
                  src={`/assets/choices/${choice}.png`}
                  width="100"
                  height="100"
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Form.Group>
  );
};

ChooseSymbol.propTypes = {
  isSelectedChoice: PropTypes.func,
  onChange: PropTypes.func,
};

ChooseSymbol.defaultProps = {
  isSelectedChoice: () => false,
  onChange: (choice) => {
    console.log("The value has changed to ", choice);
  },
};

export default ChooseSymbol;
