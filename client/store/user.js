import axios from 'axios';
import history from '../history';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const defaultUser = {};

const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me');
    let postUser = {
      _id: res.data._id,
      email: res.data.email,
      budget: res.data.budget,
    };
    dispatch(getUser(postUser || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const signUp = (userBody) => async (dispatch) => {
  let res;
  try {
    res = await axios.post('/auth/signup', userBody);
  } catch (error) {
    return dispatch(getUser({ error: error }));
  }
  try {
    let postUser = {
      _id: res.data._id,
      email: res.data.email,
      budget: res.data.budget,
    };
    dispatch(getUser(postUser));
    history.push('/plaid');
  } catch (error) {
    console.error(error);
  }
};

export const auth = (email, password) => async (dispatch) => {
  let res;
  try {
    res = await axios.post('/auth/login', { email, password });
    let postUser = {
      _id: res.data._id,
      email: res.data.email,
      budget: res.data.budget,
    };
    dispatch(getUser(postUser));

    if (!res.data.access_token[0]) {
      history.push('/plaid');
    } else {
      history.push('/transactions');
    }
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {
        _id: action.user._id,
        email: action.user.email,
        budget: action.user.budget,
        error: action.user.error,
      };
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
