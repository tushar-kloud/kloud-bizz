import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL
} from '../constants/userConstants'
import { loginAPI } from '../../api';
import secureLocalStorage from 'react-secure-storage'


export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const { data } = await loginAPI(email, password);
		const new_data = { ...data.user, accessToken: data.accessToken, refreshToken: data.refreshToken };

		// dispatch({ type: ACCESS_TOKEN_SUCCESS, payload: data.accessToken });
		dispatch({ type: USER_LOGIN_SUCCESS, payload: new_data });

		secureLocalStorage.setItem("userInfo", JSON.stringify(new_data));
		// dispatch(getUserSession());
		// Reload the window after successful login
		window.location.reload();
	} catch (error) {
		// dispatch({ type: ACCESS_TOKEN_FAIL, payload: error.message });
        console.log(error);
        
		dispatch({ type: USER_LOGIN_FAIL, payload: error.response });
	}
};