import axios from 'axios';

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
const GET_LINK_TOKEN = 'GET_LINK_TOKEN';
const SET_BUDGET = 'SET_BUDGET';
const GET_BUDGET = 'GET_BUDGET';
const ADD_TRANSACTION = 'ADD_TRANSACTION';

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

const setBudget = (budget) => ({
  type: SET_BUDGET,
  budget,
});

const getBudget = (budget) => ({
  type: GET_BUDGET,
  budget,
});

const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  transaction,
});

export const fetchTransactions = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/plaidTransactions');
      const { data } = await axios.get('/api/transaction');
      dispatch(getTransactions([...res.data.transactions, ...data]));
    } catch (error) {
      console.log('error fetching transactions', error);
    }
  };
};

export const updateTransactions = (transaction) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/transaction', transaction);
      dispatch(addTransaction(transaction));
    } catch (error) {
      console.log('error adding transaction', error);
    }
  };
};

export const fetchAcessToken = (publicToken, user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/plaidTokenExchange', {
        user: user,
        publicToken: publicToken,
      });
      dispatch(getAccessToken(data));
    } catch (error) {
      console.log('error fetching public token', error);
    }
  };
};

export const fetchLinkToken = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/linkTokenCreate');
      dispatch(getLinkToken(data));
    } catch (error) {
      console.log('error fetching link token', error);
    }
  };
};

export const fetchBudget = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/budget');
      dispatch(getBudget(data));
    } catch (error) {
      console.log('error fetching budget', error);
    }
  };
};

export const updateBudget = (budget) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/budget', budget);
      dispatch(setBudget(data));
    } catch (error) {
      console.log('error updating budget', error);
    }
  };
};

const initialState = {
  transactions: [],
  link_token: '',
  budget: {},
};

export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.transactions],
      };
    case GET_LINK_TOKEN:
      return { ...state, link_token: action.link_token };
    case SET_BUDGET:
      return { ...state, budget: action.budget };
    case GET_BUDGET:
      return { ...state, budget: action.budget };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.transaction, ...state.transactions],
      };
    default:
      return state;
  }
}
