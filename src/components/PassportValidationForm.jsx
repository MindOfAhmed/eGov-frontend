import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const PassportValidationForm = () => {
  // create state variable to control the form
  const [formData, setFormData] = useState({
    passport_number: "",
    issue_date: "",
    expiry_date: "",
    picture: null,
    reason: "",
    proof_document: null,
  });
  // create state variable to control the error message
  const [error, setError] = useState("");

  // useNavigate is a hook that allows us to navigate to different pages
  const navigate = useNavigate();

  // set the form data to the appropriate value when the input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    // copilot ^_^
  };
  // ensure that the dates entered are mumbers in the format YYYY-MM-DD
  const validateDateFormat = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // foramt YYYY-MM-DD
    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);
    const timestamp = date.getTime();

    // check if the date is a number
    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) return false;

    return dateString === date.toISOString().split("T")[0];
  };
  // copilot ^_^

  const handleSubmit = async (e) => {
    e.preventDefault(); // this is to prevent the default form submission

    // ensure that the date format is as expected
    if (
      !validateDateFormat(formData.issue_date) ||
      !validateDateFormat(formData.expiry_date)
    ) {
      setError("Invalid date format. Please use the format YYYY-MM-DD");
      return;
    }

    try {
      // form data object is not directly accepted by the server
      const formDataToSend = new FormData(); // FormData is a web API that provides a way to construct a set of key/value pairs representing form fields and their values
      // convert the form data object to a FormData object that can handle files
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      // copilot ^_^

      // make an API request to the server to validate the citizen's address
      const response = await axios.post(
        "http://127.0.0.1:8080/api/passport_info_validation/",
        formDataToSend
      );

      // Check if response and response.data are defined
      if (!response || !response.data) {
        throw new Error("Invalid server response");
      }

      // clear any previous errors
      setError("");

      // redirect the user to the next form upon success
      navigate("/success");
    } catch (error) {
      setError(error.response.data.detail);
    }
  };
  // create a state variable to control the visibility of the additional fields
  const [isVisible, setIsVisible] = useState(false);
  //  copilot suggested the useeffect because otherwise, infinte loop will occur
  useEffect(() => {
    // create a date object for three years ago
    const today = new Date();
    const threeYearsAgo = new Date(today.setFullYear(today.getFullYear() - 3))
      .toISOString()
      .slice(0, 10); // copilot ^_^
    // don't do anything if the issue date is empty
    if (formData.issue_date.length < 10) {
      return;
    }
    // if the issue date is less than three years ago, show the additional fields
    if (formData.issue_date < threeYearsAgo) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [formData.issue_date]); // dependency array, this effect runs only when formData.issue_date changes

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12 d-flex justify-content-center align-items-center flex-column mt-5">
        <h1>Passport Information</h1>
        <p>
          please confirm you current passport information and upload a new
          picture
        </p>
        <div className="form-group col-md-6">
          <label htmlFor="passport_number">Current Passport Number: </label>
          <input
            type="text"
            name="passport_number"
            id="passport_number"
            className="form-control"
            value={formData.passport_number}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="issue-date">Issue Date: </label>
          <input
            type="text"
            name="issue_date"
            placeholder="YYYY-MM-DD"
            id="issue-date"
            className="form-control"
            value={formData.issue_date}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="expiry-date">Expiry Date: </label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            name="expiry_date"
            className="form-control"
            id="expiry-date"
            value={formData.expiry_date}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="file">Upload New Picture: </label>
          <input
            type="file"
            className="form-control"
            required={true}
            onChange={handleChange}
          />
        </div>
        {isVisible === true ? (
          <>
            <p className="col-md-6 mt-3 fw-bold">
              you already renewed your passport in the last 3 years. Please
              provide an early renewal reason and upload a proof document (eg.
              police report)
            </p>
            <div className="form-group col-md-6">
              <label htmlFor="reason">Reason For Early Renewal: </label>
              <textarea
                className="form-control"
                name="reason"
                id="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="file">Upload a Proof Document: </label>
              <input
                type="file"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </>
        ) : null}
        {error && (
          <div className="form-group" role="alert">
            {error}
          </div>
        )}
        <button type="submit" className="button mt-3">
          Submit Request
        </button>
      </div>
    </form>
  );
};
