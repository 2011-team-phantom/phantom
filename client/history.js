import { createBrowserHistory } from 'history';

const history = createBrowserHistory(
  createBrowserHistory({
    forceRefresh: true,
  })
);

export default history;
