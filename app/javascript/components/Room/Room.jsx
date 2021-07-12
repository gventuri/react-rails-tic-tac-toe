import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, InputGroup, Alert } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./style.scss";

const RoomUrl = () => {
  const { roomId } = useParams();
  const roomUrl = `http://localhost:3000/rooms/${roomId}`;
  const [copied, setCopied] = useState(false);

  return (
    <>
      <Form.Group controlId="validationCustomUsername">
        <Form.Label>
          Invite other players (copy link to the clipboard)
        </Form.Label>
        <InputGroup>
          <Form.Control type="text" value={roomUrl} disabled />
          <InputGroup.Text>
            <CopyToClipboard
              text={roomUrl}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              }}
            >
              <span className="cursor-pointer">
                <FontAwesomeIcon icon={faClipboard} />
              </span>
            </CopyToClipboard>
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Alert show={copied} variant="success" dismissible>
        Copied to the clipboard
      </Alert>
    </>
  );
};

const Cell = ({ symbol, onChange }) => (
  <div className="col col-4 p-2">
    <div
      className={classNames("cell", {
        [`cell-${symbol}`]: symbol,
      })}
      onClick={() => onChange("x")}
      role="button"
      tabIndex="0"
    />
  </div>
);

const Room = ({ defaultCells }) => {
  const [cells, setCells] = useState(defaultCells);

  const updateCell = (key, value) => {
    setCells({
      ...cells,
      [key]: value,
    });
  };

  return (
    <>
      <RoomUrl />

      <div className="row">
        {Object.keys(cells).map((key) => (
          <Cell
            onChange={(newValue) => updateCell(key, newValue)}
            symbol={cells[key]}
            key={key}
          />
        ))}
      </div>
    </>
  );
};

Room.propTypes = {
  defaultCells: PropTypes.objectOf(PropTypes.any),
};

Room.defaultProps = {
  defaultCells: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  },
};

export default Room;
