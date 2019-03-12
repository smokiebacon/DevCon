import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextFieldFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

class CreateProfile extends Component {
    state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status:'',
        githubusername:'',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log('i am clicked')
    }
  render() {
      const { errors } = this.state;
    return (
    <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 md-auto">
                    <h1 className="display-4 text-center"></h1>
                    <p className="lead text-center">
                    Let's get some information to make your profile stand out!
                    </p>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit = { this.onSubmit }>
                        <TextFieldFieldGroup 
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info ="A unique handle for your profile URL. 
                                Your full name, company name, and nickname."
                        />
                    </form>
                </div>
            </div>
        </div>   
    </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default withRouter(connect(mapStateToProps)(CreateProfile));
