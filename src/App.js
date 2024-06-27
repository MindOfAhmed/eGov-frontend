import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { TownHall } from "./components/TownHall";
import { Services } from "./components/Services";
import { NotFound } from "./components/NotFound";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

function App() {
  return (
    /* router is the parent component that wraps all the routes and allows routing functionality in the app. 
    it listens to the url changes and renders the correct component  */
    <Router>
      <div className="container-fluid">
        <div className="content col-md-12">
          <Nav />
          {/* Routes is used to group Route components and ensure that only one route is rendered at a time */}
          <Routes>
            {/* route is used to define the mapping between the URL path and the component that should be rendered 
            when the path matches. Note: exact is used to match the path exactly */}
            <Route path="/" element={<Home />} exact />
            <Route path="/profile" element={<Profile />} />
            <Route path="/townhall" element={<TownHall />} />
            <Route path="/services" element={<Services />} />
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
