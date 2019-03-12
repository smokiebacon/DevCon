import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

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
  render() {
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
