import './App.css';
import Layout from './Components/Layout';
import EmailVerify from './pages/EmailVerify';
import routes from './utils/routes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (

    <Router>
      <Routes>
        <Route element={<Layout />}>
          {routes.map((route, i) => {
            return <Route key={i} path={route.path} element={route.element} />;
          })}
        </Route>
      </Routes>
    </Router>

  )

}

export default App;
