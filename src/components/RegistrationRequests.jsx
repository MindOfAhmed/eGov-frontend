import axios from "axios";
import { useEffect, useState } from "react";
import { RegistrationRequest } from "./RegistrationRequest";
import { Property } from "./Property";
import { Vehicle } from "./Vehicle";
import { Address } from "./Address";

export const RegistrationRequests = () => {
  // define state variables to store the requests
  const [requests, setRequests] = useState([]);
  // define state variables to control the rejection reason form
  const [rejectionReason, setRejectionReason] = useState("");

  // on mount, fetch the requests
  useEffect(() => {
    (async () => {
      // this function will be exceuted immediately
      try {
        const response = await axios.get(
          "http://127.0.0.1:8080/api/registration_requests/"
        );
        // set the requests in the state
        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch renewal requests:", error);
      }
    })();
  }, []);
  console.log("requests", requests);

  return (
    // map over the requests and render each request
    requests.map((request) =>
      request.request_type === "Property Registration" ? (
        <RegistrationRequest
          key={request.id}
          request={request}
          doc={
            <Property
              info={request.property_info}
              citizen={request.citizen_info}
            />
          }
          onRejectionReason={rejectionReason}
          onsetRejectionReason={setRejectionReason}
        />
      ) : request.request_type === "Vehicle Registration" ? (
        <RegistrationRequest
          key={request.id}
          request={request}
          doc={
            <Vehicle
              info={request.vehicle_info}
              citizen={request.citizen_info}
            />
          }
          onRejectionReason={rejectionReason}
          onsetRejectionReason={setRejectionReason}
        />
      ) : (
        <RegistrationRequest
          key={request.id}
          request={request}
          doc={
            <Address
              info={request.address_info}
              citizen={request.citizen_info}
            />
          }
          onRejectionReason={rejectionReason}
          onsetRejectionReason={setRejectionReason}
        />
      )
    )
  );
};
