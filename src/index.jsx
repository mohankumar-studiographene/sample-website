import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/App';
import store from '@/store/store';

const container = document.getElementById('root');

// create a root
const root = ReactDOM.createRoot(container);

const renderLoader = () => <p>Loading</p>;

//render app to root
root.render(
  <Provider store={store}>
    <Suspense fallback={renderLoader()}>
      <App />
    </Suspense>
  </Provider>,
);
