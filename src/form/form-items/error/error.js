import React from 'react';



export function Error(props) {




    return (
      <React.Fragment>
      {(!props.valid && props.errorText !== '') ? <p className = 'error_txt'>{props.errorText}</p> : null}
      </React.Fragment>
    );

}

