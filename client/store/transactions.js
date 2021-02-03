import axios from "axios";
import history from "../history";

const GET_TRANSACTIONS = "GET_TRANSACTIONS";
const GET_CATEGORIES = "GET_CATEGORIES";

const getTransactions = (transactions) => ({
  type: GET_TRANSACTIONS,
  transactions,
});

export const fetchTransactions = (access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/transactions/${access_token}`);
      console.log("transactions?", data);
      dispatch(getTransactions(data.transactions));
    } catch (error) {
      console.log("error fetching transactions", error);
    }
  };
};

export default function transactionsReducer(state = [], action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions;
    default:
      return state;
  }
}
