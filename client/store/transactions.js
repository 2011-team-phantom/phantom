import axios from "axios";
import history from "../history";

const GET_TRANSACTIONS = "GET_TRANSACTIONS";
const GET_ACCESS_TOKEN = "GET_ACCESS_TOKEN";
const GET_LINK_TOKEN = "GET_LINK_TOKEN";

const getTransactions = (transactions) => ({
  type: GET_TRANSACTIONS,
  transactions,
});

const getAccessToken = (access_token) => ({
  type: GET_ACCESS_TOKEN,
  access_token,
});

const getLinkToken = (link_token) => ({
  type: GET_LINK_TOKEN,
  link_token,
});

export const fetchTransactions = (access_token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/transactions/${access_token}`);
      dispatch(getTransactions(res.data.transactions));
    } catch (error) {
      console.log("error fetching transactions", error);
    }
  };
};

export const fetchAcessToken = (public_token, user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/plaid_token_exchange", {
        user: user,
        public_token: public_token,
      });

      dispatch(getAccessToken(data));
    } catch (error) {
      console.log("error fetching public token", error);
    }
  };
};

export const fetchLinkToken = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/link/token/create");
      dispatch(getLinkToken(data));
    } catch (error) {
      console.log("error fetching link token", error);
    }
  };
};
const initialState = {
  transactions: [],
  access_token: "",
  link_token: "",
};

export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.transactions],
      };
    case GET_ACCESS_TOKEN:
      return { ...state, access_token: action.access_token };
    case GET_LINK_TOKEN:
      return { ...state, link_token: action.link_token };
    default:
      return state;
  }
}
