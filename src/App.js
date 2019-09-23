import React, { Component } from 'react';
import './App.css';
import Alert from './components/Alert'

class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
       showAlertMessage: false,
       type: '',
       firstName: null,
       lastName: null,
       email: null,
       password: null,
       formErrors:{
         firstName: "",
         lastName: "",
         email: "",
         password: ""
       }
    }
  }

  validForms = ({ formErrors, ...rest }) => {
    let valid = true;
    console.log(rest);
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });

    return valid;
};

  handleChange = e => {
    const { name, value } = e.target;
    console.log(name,value);

    let formErrors = this.state.formErrors;
    //validate form filed
    switch (name) {
      case 'firstName':
        formErrors.firstName = value.length < 3 ? 'at least 3 charactar required' : '';
        break;
      case 'lastName':
        formErrors.lastName = value.length < 3 ? 'at least 3 charactar required' : '';
        break;
      case 'email':
        const emailRegex =  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        formErrors.email = emailRegex.test(value) ? "" : "invalid emaill address";
        break;
      case 'password':
        formErrors.password = value.length < 6 ? 'at least 6 charactar required' : '';
        break;
      default:
        break
    }

    this.setState({
      formErrors,
      [name]:value
    },() => {
      console.log(this.state);
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.validForms(this.state)) {
      this.setState({
        type: 'success',
        showAlertMessage: true
      })

      setTimeout(() => {
        this.setState({
          showAlertMessage : false
        })
      },2000)

      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    }else {
      this.setState({
        type: 'error',
        showAlertMessage: true
      })

      setTimeout(() => {
        this.setState({
          showAlertMessage : false
        })
      },2000)

      console.log('Form Invalid Display Error Message');
    }
  }

  render() {
    const { showAlertMessage, type, firstName, lastName, email, password, formErrors } = this.state;
    return (
      <div className="wrapper">
        { showAlertMessage ? <Alert type={type} /> : null }
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
                className={formErrors.firstName.length > 0 ? 'error' : null}
              />
            {formErrors.firstName.length > 0 && (
              <span className="errorMessage">{formErrors.firstName}</span>
            )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
                className={formErrors.lastName.length > 0 ? 'error' : null}
              />
            {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
                className={formErrors.email.length > 0 ? 'error' : null}
              />
            {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
                className={formErrors.password.length > 0 ? 'error' : null}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
