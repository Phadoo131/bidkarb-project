import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route ,createBrowserRouter, useNavigate} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getCurrentUser, getMenu, removeCurrentUser } from "../util/APIUtils";
import { userContext } from "../util/userContext";
import { COMPANY_NAME } from '../constants';
import Main , {routeList}from "../components/layout/Main";
import LoadingIndicator from "../components/common/LoadingIndicator";
import AppHeader from "../components/common/AppHeader";
import Login from "../pages/user/login/Login";
import Home from "../pages/home/Home";
import NotFound from "../pages/notfound/NotFound";
import Signup from "../pages/user/signup/Signup";
import NavBar from "../components/common/NavBar";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import BasicExample from '../components/TestMyAuctionNav'
import MyAuctionNav from "../components/MyAuctionNav";
import HomePage from "../pages/Old-ones/HomePage";
import BidKarbHome from "../components/bank/Homepage/BidKarbHome";
import BidKarbUserInfo, {action as bidKarbUserInfoAction} from "../pages/Old-ones/BidKarbUserInfo";
import { getAllBkUserInfo } from "../API/BidKarbUser";
import "bootstrap/dist/css/bootstrap.min.css"; //import react-bootstrap

function App(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [filledBkUser, setFilledBkUser] = useState(false);

  useEffect(() => {
    loadCurrentlyLoggedInUser();

    return () => {
      console.log("cleanup");
    };
  }, []);

  const loadCurrentBkUserInfo = async (response) => {
    try {
      const bkUsers = await getAllBkUserInfo();
      console.log("bkUsers.data:", bkUsers.data);
  
      const filledUser = await bkUsers.data.find((bkUser) => { 
        return bkUser.user.email === response.email});
  
      if (filledUser) {
        console.log("Filled user details:", filledUser.user);
        return true;
      } else {
        console.log("User has not filled the form.");
        return false;
      }
    } catch (error) {
      console.error("Error fetching bkUsers:", error);
      return null;
    }
  };
  

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log("toggle show sidebar");
  };

  const loadCurrentlyLoggedInUser =  async () => {
    setLoading(true);
    try {
      let response = await getCurrentUser();

      setCurrentUser(response);
      setAuthenticated(true);
      setLoading(false);
      let filledUser = await loadCurrentBkUserInfo(response);

      if (filledUser) {
        setFilledBkUser(true);
      } else {
        setFilledBkUser(false);
      }
    } catch (error){
      removeCurrentUser();
      setLoading(false);
    }
  };

  const handleLogout = (params) => {
    //localStorage.removeItem(ACCESS_TOKEN);
    removeCurrentUser();
    setAuthenticated(false);
    setCurrentUser(null);
    setShowSidebar(false);

    //Alert.success("You're safely logged out!");
    toast("You're safely logged out!");
    window.history.pushState({}, undefined, "/");

  };

  const internalRouter = createBrowserRouter(
    [
    {
      path: "/",
      element: <InternalRoot currentUser={currentUser} showSidebar={showSidebar} toggleSidebar={toggleSidebar} handleLogout={handleLogout} authenticated={authenticated} 
                  filledBkUser={filledBkUser} setFilledBkUser={setFilledBkUser} />,
      errorElement: <NotFound />,
      children: [
        {
          errorElement: <NotFound />,
          children: [
            {path: "bidkarb-user-info", element:<BidKarbUserInfo filledBkUser={filledBkUser} setFilledBkUser={setFilledBkUser}/>, action: bidKarbUserInfoAction},
            ...routeList
          ],
        },
      ],
    },
  ]
  );


  const externalRouter = createBrowserRouter([
    {
      path: "/",
      element: <ExternalRoot  handleLogout={handleLogout} />,
      errorElement: <NotFound />,
      children: [
        {
          errorElement: <NotFound />,
          children: [
            {index:true, element: <BidKarbHome />},
            {path:"login", element: <Login {...props} handleLoginSuccess={loadCurrentlyLoggedInUser} />, },
            {path:"signup", element : <Signup authenticated={authenticated} {...props} />},
          ],
        },
      ],
    },
  ]);

  if (loading) {
    return <LoadingIndicator />;
  } else {
    if (authenticated) {
      
      return (
          <RouterProvider router={internalRouter}/>
      );
    } else {
      return (
        <RouterProvider router={externalRouter} />
      );
    }
  }
}



function InternalRoot({currentUser, showSidebar , toggleSidebar, handleLogout, filledBkUser, setFilledBkUser}){
  const ctxValue = {
    user: currentUser,
    doLogout: handleLogout,
    sidebarData: getMenu(currentUser),
  };


  currentUser

  return (
    <div className="wrapper">

        <userContext.Provider value={ctxValue}>
          {/* <Sidebar companyName={COMPANY_NAME} showSidebar={showSidebar} toggleSidebar={toggleSidebar} onLogout={handleLogout}/> */}
          <div className="content-wrapper">
            {/* <Navbar showSidebar={showSidebar} toggleSidebar={toggleSidebar} onLogout={handleLogout} /> */}
            <NavBar onLogout={handleLogout} authenticated={true}/>
            {filledBkUser ? <Main /> : <BidKarbUserInfo filledBkUser={filledBkUser} setFilledBkUser={setFilledBkUser}/>}
          </div>
        </userContext.Provider>

        <ToastContainer autoClose={3000} pauseOnHover />

    </div>
  );
}

function ExternalRoot({handleLogout }){

  const navigate = useNavigate();

  const handleBack = () => {
    
    navigate(-1);
  };

  return (
    <div className="app">
      <div className="app-top-box">
        <NavBar onLogout={handleLogout} authenticated={false} />
      </div>
      <div className="app-body">      
        <Outlet/>
      </div>
      <ToastContainer autoClose={3000} pauseOnHover />
    </div>
  );
}
export default App;