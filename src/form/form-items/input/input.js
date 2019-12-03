import React from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super();
  }

  inputElement = React.createRef();

  valueChange = (e, formElem) => {
      this.props.valueChange(e, formElem);
  }

  componentDidMount() {
    this.inputElement.current.value = this.props.formElem.initialValue || '';

  }

  render() {

    return (
      <input
      type = {this.props.formElem.formType}
      style = {this.props.formElem.setStyle}
      onChange={(e, f) => this.valueChange(e, this.props.formElem)}
      name={this.props.formElem.name}
      className={!this.props.formElem.valid ? 'invalid' : ''}
      ref = {this.inputElement}
    ></input>
    );
  }
}
