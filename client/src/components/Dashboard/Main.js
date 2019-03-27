import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../common/spinner'
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    componentDidMount () {
        this.props.getCurrentProfile();
        console.log(this.props, 'THIS IS PROPS FROM MAIN.JS')
    }
  render() {
    
      const { user } = this.props.auth;
      const { profile, loading } = this.props.profile;
      
      let dashBoardContent;
      console.log(this.props.profile,'THIS IS PROFILE')
      
      if(profile === null || loading) {
        dashBoardContent = <Spinner />
      } else {
          //check if logged in User has profile data
          if (Object.keys(profile).length > 0) {
            dashBoardContent = <h2>TO DO DISPLAY PROFILE </h2>  
          } else {
            //User is logged in, but has no profile yet.
            //create profile
            dashBoardContent = (
                <div>
                    <p className = "lead text-muted"> Welcome { user.name } </p>
                    <p>You have not added a profile yet. Please create a profile!</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile</Link>
                </div>
            )
          }
      }

    return (
      <div className = "dashboard">
        <div className = "container">
            <div className ="row">
                <div className="col-md-12">
                <h1 className ="display-4"> Dashboard</h1>
                 {dashBoardContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile})(Dashboard);