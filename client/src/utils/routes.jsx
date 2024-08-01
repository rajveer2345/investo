import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AdminLogin from "../pages/AdminLogin";
import EmailVerify from "../pages/EmailVerify";
import Test from "../Components/Test";
import Landing from "../pages/Landing";

const routes = [
    { path: '/', element: <Landing/> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/investo-admin', element: <AdminLogin/> },
    { path: '/verifyemail/:token', element: <EmailVerify/> },
    { path: '/verifyemail/:token', element: <EmailVerify/> },
    { path: '/test', element: <Test/> },
  ];

  export default routes;