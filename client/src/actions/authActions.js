import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS } from './types';
//Register action
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/auth/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
}

//login get User token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //save to local storage
            const { token } = res.data;
            //set token to local storage
            localStorage.setItem('jwtToken', token);
            //set token to auth Header
            setAuthToken(token);
            //decode jwt token to get user data
            const decoded = jwt_decode(token);
        })
        .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }) )
};