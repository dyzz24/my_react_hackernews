import React from 'react';
import './httpservice.css';


class Httpservice extends React.Component {
  constructor(props) {
    super();

  }




  async getData(stringUrl) {

      const request = await fetch(stringUrl);

      if (request.ok) {
        const response = await request.json();
        return response

      }  else {
        throw new Error(request.statusText)
      }

  }





}

export default Httpservice;
