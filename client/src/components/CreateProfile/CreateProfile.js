import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
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
      //select options for Status
      const options = [
          { label: '* Select Professional Status', value: 0 },
          { label: 'Developer', value: 'Developer'},
          { label: 'Junior Developer', value: 'Junior Developer' },
          { label: 'Senior Developer', value: 'Senior Developer' },
          { label: 'Manager', value: 'Manager' },
          { label: 'Student or Learning', value: 'Student or Learning' },
          { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
          { label: 'Intern', value: 'Intern' },
          { label: 'Other', value: 'Other' }
      ]
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
                        <TextFieldGroup 
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info ="A unique handle for your profile URL. 
                                Your full name, company name, and nickname."
                        />
                        <SelectListGroup 
                            placeholder="* Status"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            options={options}
                            error={errors.status}
                            info ="Where are you in your career?." 
                        />
                         <TextFieldGroup 
                            placeholder="Company"
                            name="company"
                            value={this.state.company}
                            onChange={this.onChange}
                            error={errors.company}
                            info ="Could be your own company of one you work for."
                        />
                         <TextFieldGroup 
                            placeholder="Website"
                            name="website"
                            value={this.state.website}
                            onChange={this.onChange}
                            error={errors.website}
                            info ="Could be your own company of one you work for."
                        />
                         <TextFieldGroup 
                            placeholder="Location"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                            info ="Could be your own company of one you work for."
                        />
                         <TextFieldGroup 
                            placeholder="Skills"
                            name="skills"
                            value={this.state.skills}
                            onChange={this.onChange}
                            error={errors.skills}
                            info ="Please use comma separated values. Example: HTML, CSS, Javascript" 
                        />
                         <TextFieldGroup 
                            placeholder="Github Username"
                            name="githubusername"
                            value={this.state.githubusername}
                            onChange={this.onChange}
                            error={errors.githubusername}
                            info="If you want your latest repositories and Github link, include your username."
                        />
                        <TextAreaFieldGroup 
                            placeholder="Short Biography"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info="Tell us a bit about yourself."
                        />
                        <div className="mb-3">
                        <button onClick={() => {
                            this.setState(
                                previousState => ({
                                    displaySocialInputs : !previousState.displaySocialInputs
                                })
                            )
                        }} className="btn btn-light">
                        Add Social Network Links
                        </button>
                        <span className="text-muted">Optional</span>
                        </div>

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
