import axios from "axios";
import { useEffect, useState } from "react";
import { RenewalRequest } from "./RenewalRequest";
import { Passport } from "./Passport";
import { DrivingLicense } from "./DrivingLicense";

export const RenewalRequests = () => {
  // define state variables to store the requests
  const [requests, setRequests] = useState([]);

  // on mount, fetch the requests
  useEffect(() => {
    (async () => {
      // this function will be exceuted immediately
      try {
        const response = await axios.get(
          "http://127.0.0.1:8080/api/renewal_requests/"
        );
        // set the requests in the state
        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch renewal requests:", error);
      }
    })();
  }, []);
  console.log("requests", requests); // Debug: Log the requests

  // define the function to handle the accept button
  const handleAccept = async (request) => {
    // send an API request to accept the renewal request
    try {
      await axios.post("http://127.0.0.1:8080/api/accept_renewal_request/", {
        request: request,
      });
    } catch (error) {
      console.error("Failed to accept renewal request:", error);
    }
  };
  // define the function to handle the reject button
  const handleReject = async (request) => {
    // send an API request to accept the renewal request
    try {
      await axios.post("http://127.0.0.1:8080/api/reject_renewal_request/", {
        request: request,
      });
    } catch (error) {
      console.error("Failed to reject renewal request:", error);
    }
  };

  // this function will extend the expiry date of the documents by years
  const extendExpiryDate = (date, years) => {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };
  // copilot ^_^ helped me to write this code, i added years as arg

  return (
    // map over the requests and render them
    requests.map((request) =>
      request.request_type === "Passport" ? (
        <RenewalRequest
          key={request.id}
          request={request}
          oldDoc={
            <Passport
              citizen={request.citizen_info}
              info={request.passport_info[0]}
              picture={request.passport_info[0].picture}
            />
          }
          newDoc={
            <Passport
              citizen={request.citizen_info}
              info={{
                ...request.passport_info[0],
                issue_date: new Date().toISOString().split("T")[0],
                expiry_date: extendExpiryDate(new Date(), 5),
              }}
              picture={request.picture}
            />
          }
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ) : (
        <RenewalRequest
          key={request.id}
          request={request}
          oldDoc={
            <DrivingLicense
              picture={request.license_info[0].picture}
              info={request.license_info[0]}
              citizen={request.citizen_info}
            />
          }
          newDoc={
            <DrivingLicense
              picture={request.picture}
              info={{
                ...request.license_info[0],
                issue_date: new Date().toISOString().split("T")[0],
                expiry_date: extendExpiryDate(new Date(), 10),
              }}
              citizen={request.citizen_info}
            />
          }
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )
    )
  );
};
