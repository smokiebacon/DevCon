import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Spinner from '../common/spinner'
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions'
class Dashboard extends Component {
    componentDidMount () {
        this.props.getCurrentProfile();
        console.log(this.props, 'THIS IS PROPS FROM MAIN.JS')
    }

    onDeleteClick = (e) => {
      this.props.deleteAccount();


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
            dashBoardContent = (
              <div>                  
                  <p className = "lead text-muted"> Welcome <Link to={`/profile/${profile.handle}`}>{ user.name } </Link> </p>
                  <ProfileActions />
                  <div style={{ marginBotton: '60px'}}>
                  <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
                  </div>
              </div>
            )  
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
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);