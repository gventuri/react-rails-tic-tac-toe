import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, InputGroup, Alert } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

const RoomUrlSharer = () => {
  const roomUrl = window.location.href;
  const [copied, setCopied] = useState(false);

  return (
    <>
      <Form.Group controlId="roomUrl">
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

export default RoomUrlSharer;
