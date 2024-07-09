// css and bootstrap
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// hooks
import { useEffect, useState } from "react";
// axios
import axios from "axios";
// react router library
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// font awesome for react
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// components
// import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { TownHall } from "./components/TownHall";
import { Services } from "./components/Services";
import { NotFound } from "./components/NotFound";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { LoginForm } from "./components/LoginForm";
import { CitizenValidationForm } from "./components/CitizenValidationForm";
import { AddressValidationForm } from "./components/AddressValidationForm";
import { PassportValidationForm } from "./components/PassportValidationForm";
import { Success } from "./components/Success";
// add the icons to the library
library.add(fas);

function App() {
  // the following states and handlers have been lifted up from the nav component
  const [isLoggedIn, setIsLoggedIn] = useState(false); // this state will check if the user is logged in or not
  const [userData, setUserData] = useState(null); // this state will store the user data after login

  useEffect(() => {
    // check if the user is logged in
    const token = localStorage.getItem("access_token");
    if (token) {
      // set logged in state
      setIsLoggedIn(!!token);

      // fetch the user data
      axios
        .get("http://127.0.0.1:8080/api/user/", {
          // pass the access token in the headers since this is a prtotected endpoint
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error(error));
    }
  }, []);

  const handleLogout = () => {
    // remove the token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // update the logged in state
    setIsLoggedIn(false);
  };

  // this handler will be passed in as a prop for the login form
  const handleLogin = (userDetails) => {
    // update the state and the user data
    setIsLoggedIn(true);
    setUserData(userDetails);
  };

  return (
    /* Router is the parent component that wraps all the routes and allows routing functionality in the app. 
    it listens to the url changes and renders the correct component  */
    <Router>
      <div className="container-fluid">
        <div className="content col-md-12">
          <Nav
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            userData={userData}
          />
          {/* Routes is used to group Route components and ensure that only one route is rendered at a time */}
          <Routes>
            {/* route is used to define the mapping between the URL path and the component that should be rendered 
            when the path matches. Note: exact is used to match the path exactly */}
            <Route path="/" element={<Home />} exact />
            <Route
              path="/profile"
              element={
                // <ProtectedRoute>
                  <Profile />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/townhall"
              element={
                // <ProtectedRoute>
                  <TownHall />
                // </ProtectedRoute>
              }
            />
            <Route path="/services" element={<Services />} />
            <Route
              path="/services/citizen_info"
              element={
                // <ProtectedRoute>
                  <CitizenValidationForm next="/services/address" />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/services/address"
              element={
                // <ProtectedRoute>
                  <AddressValidationForm next="/services/passport" />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/services/passport"
              element={
                // <ProtectedRoute>
                  <PassportValidationForm />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/login/"
              element={<LoginForm onLogin={handleLogin} />}
            />
            <Route path="/success" element={<Success />} />
            {/* this route will be rendered when no other route matches the URL path */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
