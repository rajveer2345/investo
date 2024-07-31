import React,{useEffect, useState} from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import routes from '../utils/routes';

function Layout() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const authToken = localStorage.getItem("token");
  const [route, setRoute] = useState();


  useEffect(() => {
      const routeObj = routes.find((item, i) => item.path === path);
      setRoute(routeObj);
      if ( authToken && (path === '/' || path === '/signup')) {
          navigate("/dashboard");
      } else if (!authToken && path === '/dashboard') {
          navigate("/");
      }
  }, [authToken, window.location.pathname]);

  return (


     <Outlet/>

    
  )
}

export default Layout