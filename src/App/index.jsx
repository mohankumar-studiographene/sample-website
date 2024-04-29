import { BrowserRouter, Link } from 'react-router-dom';

import AppRoutes from '@/Routes';

import 'react-loading-skeleton/dist/skeleton.css';

const App = () => {
  return (
    <BrowserRouter>
      <h1>React CSR</h1>
      <br />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/passengers">Passengers</Link>
        <Link to="/test">Test</Link>
      </nav>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
