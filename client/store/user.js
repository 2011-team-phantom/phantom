import axios from "axios";
import history from "../history";

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const signUp = (userBody) => async (dispatch) => {
  let res;
  try {
    res = await axios.post("/auth/signup", userBody);
  } catch (error) {
    return dispatch(getUser({ error: error }));
  }
  try {
    dispatch(getUser(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const auth = (email, password) => async (dispatch) => {
  let res;
  try {
    res = await axios.post("/auth/login", { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    console.log("res.data in auth before dispatch to reducer", res.data);
    dispatch(getUser(res.data));
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

const defaultUser = {};

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
