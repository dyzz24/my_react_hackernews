import React from 'react';

export function Message(props) {
  return (
    <React.Fragment>
      {props.validatorMessage ? (
        <p className="message">{props.validatorMessage}</p>
      ) : null}
    </React.Fragment>
  );
}
