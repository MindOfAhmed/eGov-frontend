import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CitizenValidationForm = ({ next }) => {
  // create state variable to control the form
  const [formData, setFormData] = useState({
    national_id: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    sex: "",
    blood_type: "",
  });
  // create state variable to control the error message
  const [error, setError] = useState("");

  // useNavigate is a hook that allows us to navigate to different pages
  const navigate = useNavigate();

  // set the form data to the appropriate value when the input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // this is to prevent the default form submission
    try {
      // retrieve the token from local storage
      const token = localStorage.getItem("access_token");

      // make an API request to the server to validate the citizen information
      const response = await axios.post(
        "http://127.0.0.1:8080/api/citizen_info_validation/",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }, // pass the token in the headers as proof of authentication
        }
      );

      // Check if response and response.data are defined
      if (!response || !response.data) {
        throw new Error("Invalid server response");
      }

      // clear any previous errors
      setError("");

      // redirect the user to the next form upon success
      navigate(`/api/${next}/`);
    } catch (error) {
      setError(error.response.data.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12 d-flex justify-content-center align-items-center flex-column mt-5">
        <h1>Personal Details</h1>
        <p>please fill in the form below accurately</p>
        <div className="form-group col-md-6">
          <label htmlFor="national_id">National ID</label>
          <input
            type="text"
            id="national_id"
            name="national_id"
            className="form-control"
            value={formData.national_id}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="first_name">First Name: </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="form-control"
            value={formData.first_name}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="last_name">Last Name: </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="form-control"
            value={formData.last_name}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="date_of_birth">Date of Birth: </label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            name="date_of_birth"
            id="date_of_birth"
            className="form-control"
            value={formData.date_of_birth}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6  d-flex flex-column justify-content-center align-items-center">
          <label className="col-md-6  d-flex justify-content-center align-items-center">
            Sex:
          </label>
          <div className="form-check col-md-6  d-flex justify-content-center align-items-center">
            <input
              type="radio"
              name="sex"
              className="form-check-input"
              id="Male"
              value="Male"
              required={true}
              checked={formData.sex === "Male"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="Male">
              Male
            </label>
          </div>
          <div className="form-check col-md-6  d-flex justify-content-center align-items-center">
            <input
              type="radio"
              name="sex"
              className="form-check-input"
              id="Female"
              value="Female"
              required={true}
              checked={formData.sex === "Female"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="Female">
              Female
            </label>
          </div>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="blood_type">Blood Type: </label>
          <select
            className="form-control"
            name="blood_type"
            id="blood_type"
            value={formData.blood_type}
            onChange={handleChange}
            required={true}
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        {error && (
          <div className="form-group" role="alert">
            {error}
          </div>
        )}
        <button type="submit" className="button mt-3">
          Next
        </button>
      </div>
    </form>
  );
};
