import axios from 'axios'

import { GET_PROFILE, CLEAR_CURRENT_PROFILE,  PROFILE_LOADING, GET_ERRORS } from './types';

//get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch (error => 
            dispatch({
                type: GET_PROFILE,
                payload: {} //empty because upon first regis, profile is empty. show button to create profile.
            })
        )

}

//load profile
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}