import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';

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
                payload: {}
            })
        )

}

//load profile
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}