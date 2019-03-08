import { TEST_DISPATCH } from './types'
//Register action
export const registerUser = (userData) => {
    return {
        type: TEST_DISPATCH,
        payload: userData
    }
}