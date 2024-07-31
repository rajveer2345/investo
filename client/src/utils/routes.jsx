import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AdminLogin from "../pages/AdminLogin";
import EmailVerify from "../pages/EmailVerify";
import Test from "../Components/Test";

const routes = [
    { path: '/', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/investo-admin', element: <AdminLogin/> },
    { path: '/verifyemail/:token', element: <EmailVerify/> },
    { path: '/test', element: <Test/> }
  ];

  export default routes;