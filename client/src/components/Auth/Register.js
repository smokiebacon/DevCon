import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }
  onChange = (e) => {
      this.setState({
          [e.target.name] : e.target.value
      })
    }
  onSubmit = (e) => {
      e.preventDefault();
      const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password
      }

      this.props.registerUser(newUser, this.props.history)
     
  }

  render() {
      const { errors } = this.state;
      if (this.props.auth.isAuthenticated) {
        return <Redirect to="/dashboard" />;
      }
    return (
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text" 
                    className={classnames("form-control form-control-lg", 
                        {"is-invalid" : errors.name })}
                    placeholder="Name" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.onChange} />
                        {errors.name && (<div className="invalid-feedback">{ errors.name } </div>)}

                </div>
                <div className="form-group">
                  <input type="email" 
                    className={classnames("form-control form-control-lg",
                         {"is-invalid" : errors.email})} 
                    placeholder="Email Address" 
                    name="email" 
                    value={this.state.email} 
                    onChange={this.onChange}/>
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" 
                    className={classnames("form-control form-control-lg",
                        {"is-invalid" : errors.password})} 
                    placeholder="Password" 
                    name="password" 
                    value={this.state.password}
                    onChange={this.onChange}/>
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" 
                   className={classnames("form-control form-control-lg",
                    {"is-invalid" : errors.password2})} 
                   placeholder="Confirm Password" 
                   name="password2"
                   value={this.state.password2} 
                   onChange={this.onChange} />
                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired 
} //propTypes is to figure our why our code isn't working.
//Proptypes is used to define types like 
//strings, functions, number, etc. With 
//types defined we know what to expect for our incoming data.


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
