import { USER_LOGGIN_KEY } from "../utils/constants";

export async function loginUser(dispatch, user) {
  
  try {
    
      dispatch({ type: 'LOGIN_SUCCESS', user });
      localStorage.setItem(USER_LOGGIN_KEY, JSON.stringify(user));
      return user
    
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}
 
export async function logoutUser(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem(USER_LOGGIN_KEY); 
}