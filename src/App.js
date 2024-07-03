// css and bootstrap
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// hooks
import { useEffect, useState } from "react";
// react router library
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// font awesome for react
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// components
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { TownHall } from "./components/TownHall";
import { Services } from "./components/Services";
import { NotFound } from "./components/NotFound";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { LoginForm } from "./components/LoginForm";
// add the icons to the library
library.add(fas);

function App() {
  // the following states and handlers have been lifted up from the nav component
  const [isLoggedIn, setIsLoggedIn] = useState(false); // this state will check if the user is logged in or not

  // check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // set logged in state
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // remove the token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // update the logged in state
    setIsLoggedIn(false);
  };
  
  // this handler will be passed in as a prop for the login form
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    /* router is the parent component that wraps all the routes and allows routing functionality in the app. 
    it listens to the url changes and renders the correct component  */
    <Router>
      <div className="container-fluid">
        <div className="content col-md-12">
          <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          {/* Routes is used to group Route components and ensure that only one route is rendered at a time */}
          <Routes>
            {/* route is used to define the mapping between the URL path and the component that should be rendered 
            when the path matches. Note: exact is used to match the path exactly */}
            <Route path="/" element={<Home />} exact />
            <Route path="/profile" element={<Profile />} />
            <Route path="/townhall" element={<TownHall />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/login/"
              element={<LoginForm onLogin={handleLogin} />}
            />
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
