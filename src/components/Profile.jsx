import { useState, useEffect } from "react";
import axios from "axios";
// import { Tab, Tabs } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Passport } from "./Passport";
import { DrivingLicense } from "./DrivingLicense";
import { Address } from "./Address";
import { Property } from "./Property";
import { Vehicle } from "./Vehicle";

export const Profile = () => {
  // define state variable that will store the user's documetns
  const [userDocuments, setUserDocuments] = useState(null);
  // define state variable that will keep track of the active tab key
  const [activeKey, setActiveKey] = useState("Passport");

  // derive the state variable that will store the user's documents
  const addresses = userDocuments?.addresses;
  const properties = userDocuments?.properties;
  const vehicles = userDocuments?.vehicles;
  const license = userDocuments?.license;
  const passport = userDocuments?.passport;
  const citizen = userDocuments?.citizen;

  // on mount, load the user documents
  useEffect(() => {
    (async () => {
      try {
        // make an API call to fetch the user's documents
        const response = await axios.get(
          "http://127.0.0.1:8080/api/user_documents/"
        );
        if (!response || !response.data) {
          setUserDocuments([]);
          return;
        }
        // set the user documents in the state
        setUserDocuments(response.data);
      } catch (error) {
        console.error("Failed to fetch user documents:", error);
      }
    })();
  }, []);
  console.log("User documents:", userDocuments);

  return (
    // place each document in a separate tab
    // <Tabs
    //   defaultActiveKey="Passport"
    //   id="profile-tab"
    //   className="d-flex justify-content-center"
    // >
    //   <Tab eventKey="Passport" title="Passport">
    // <div className="row d-flex justify-content-center">
    //   <div className="col-md-8 mt-5">
    //     {passport && (
    //       <Passport
    //         citizen={citizen}
    //         info={passport}
    //         picture={passport.picture}
    //       />
    //     )}
    //   </div>
    // </div>
    //   </Tab>
    //   <Tab eventKey="Driver's License" title="Driver's License">
    // <div className="row d-flex justify-content-center mt-5">
    //   <div className="col-md-8">
    //     {license && (
    //       <DrivingLicense
    //         citizen={citizen}
    //         info={license}
    //         picture={license.picture}
    //       />
    //     )}
    //   </div>
    // </div>
    //   </Tab>
    //   <Tab eventKey="Addresses" title="Address(es)">
    //     <div className="row d-flex justify-content-center mt-5">
    //       <div className="col-md-8">
    // {addresses &&
    //   addresses.map((address, index) => (
    //     <Address key={index} citizen={citizen} info={address} />
    //   ))}
    //       </div>
    //     </div>
    //   </Tab>
    //   <Tab eventKey="Properties" title="Properties">
    //     <div className="row d-flex justify-content-center mt-5">
    //       <div className="col-md-8">
    // {properties &&
    //   properties.map((property, index) => (
    //     <Property key={index} citizen={citizen} info={property} />
    //   ))}
    //       </div>
    //     </div>
    //   </Tab>
    //   <Tab eventKey="Vehicles" title="Vehicle(s)">
    //     <div className="row d-flex justify-content-center mt-5">
    //       <div className="col-md-8">
    // {vehicles &&
    //   vehicles.map((vehicle, index) => (
    //     <Vehicle key={index} citizen={citizen} info={vehicle} />
    //   ))}
    //       </div>
    //     </div>
    //   </Tab>
    // </Tabs>

    <>
      {/* the citizen's profile picture */}
      <div className="row">
        {citizen.picture && (
          <img src={citizen.picture} alt="profile" className="m-3" />
        )}
      </div>

      {/*  place each document in a separate tab */}
      <Tab.Container
        id="profile-tab"
        defaultActiveKey="Passport"
        activeKey={activeKey}
        onSelect={(key) => setActiveKey(key)}
      >
        <Row>
          <Col sm={3}>
            {/* the navigation links for the tabs */}
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link
                  eventKey="Passport"
                  disabled={!passport}
                  className={activeKey === "Passport" ? "active_tab" : ""}
                >
                  Passport
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Driver's License"
                  disabled={!license}
                  className={
                    activeKey === "Driver's License" ? "active_tab" : ""
                  }
                >
                  Driver's License
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Addresses"
                  disabled={!addresses}
                  className={activeKey === "Addresses" ? "active_tab" : ""}
                >
                  Address(es)
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Properties"
                  disabled={!properties}
                  className={activeKey === "Properties" ? "active_tab" : ""}
                >
                  Properties
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Vehicles"
                  disabled={!vehicles}
                  className={activeKey === "Vehicles" ? "active_tab" : ""}
                >
                  Vehicle(s)
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            {/* the corresponding content for each tab */}
            <Tab.Content className="d-flex justify-content-center">
              <Tab.Pane eventKey="Passport" className="col-md-8 mt-5">
                {passport && (
                  <Passport
                    citizen={citizen}
                    info={passport}
                    picture={passport.picture}
                  />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="Driver's License" className="col-md-8 mt-5">
                {license && (
                  <DrivingLicense
                    citizen={citizen}
                    info={license}
                    picture={license.picture}
                  />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="Addresses" className="col-md-8 mt-5">
                {addresses &&
                  addresses.map((address, index) => (
                    <Address key={index} citizen={citizen} info={address} />
                  ))}
              </Tab.Pane>
              <Tab.Pane eventKey="Properties" className="col-md-8 mt-5">
                {properties &&
                  properties.map((property, index) => (
                    <Property key={index} citizen={citizen} info={property} />
                  ))}
              </Tab.Pane>
              <Tab.Pane eventKey="Vehicles" className="col-md-8 mt-5">
                {vehicles &&
                  vehicles.map((vehicle, index) => (
                    <Vehicle key={index} citizen={citizen} info={vehicle} />
                  ))}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};
