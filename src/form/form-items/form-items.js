import React from 'react';
import './form-items.css';
import { Error } from './error/error';
import { Validator } from './validator/validator';
import { Message } from './message/message';
import Input from './input/input';

export default class FormItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formArray: this.props.formArray
      // inputState: []
    };
  }

  validator = new Validator();


  componentDidMount() {
    this.setInitialInputsState();

  }

  setInitialInputsState = () => {
    if (this.state.formArray.length > 0) {
      const modifierInputsArr = this.state.formArray.map(val => {
        if (val.validator && val.validator.required) {
          val['valid'] = false;
          val['value'] = val.initialValue || '';
          val.errorText = '';
        } else {
          val['valid'] = true;
          val['value'] = val.initialValue || '';
          val.errorText = '';
        }
        return val;
      });
      this.setState(state => ({
        formArray: [...modifierInputsArr]
      }));
    }
  };

  valueChange = (e, inputState) => {
    const modifierInputsArr = this.state.formArray.map(val => {
      if (val.name === e.target.name) {
        val.value = e.target.value;
        const error = this.validator(inputState.validator, e.target.value);
        if (error !== '') {
          val.valid = false;
          val.errorText = error;
        } else {
          val.valid = true;
          val.errorText = '';
        }
      }
      return val;
    });

    this.setState(state => ({
      formArray: [...modifierInputsArr]
    }));

    console.log(this.state);
    // console.log(e.target.value, e.target.name, inputState);
  };



  inputGenerate = () => {
    const formElems = this.state.formArray.map(formElem => (
      <li key={formElem.name}>
        <label>{formElem.title}</label>

        <Message validatorMessage = {formElem.validatorMessage}/>
        <Input formElem = {formElem} valueChange = {this.valueChange}/>
        <Error valid={formElem.valid} errorText={formElem.errorText}></Error>
      </li>
    ));
    return formElems;
  };

  getCount = () => {
    let count = 0;
    this.state.formArray.forEach(inputs => {
      if (inputs.valid) {
        count++;
      }
    });
    return count;
  }

  formSend = () => {

    const arrForSend = this.state.formArray.map(val => {
      const {name, value} = val;
      return {name, value};
    });

    this.props.parentCallback(arrForSend);

  }

  clearForm = () => {
    this.setInitialInputsState();
    this.props.clear();
  }

  render() {
    const formElems = this.inputGenerate();
    const count = this.getCount();


    return (
      <form onReset={this.clearForm} >
        <p className="title">{this.props.formName}</p>
        <ul>{formElems}</ul>
        <div className="btnBlock">
          <button type="reset">Очистить</button>
          <button
          type = 'button'
            onClick = {this.formSend}
            className={
              count === this.state.formArray.length ? 'active' : 'notactive'
            }
          >
            Подтвердить
          </button>
        </div>
      </form>
    );
  }
}
