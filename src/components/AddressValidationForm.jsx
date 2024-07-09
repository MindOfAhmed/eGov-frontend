import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddressValidationForm = ({ next }) => {
  // create state variable to control the form
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    street: "",
    building_number: "",
    floor_number: "",
    apartment_number: "",
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
      // make an API request to the server to validate the citizen's address
      const response = await axios.post(
        "http://127.0.0.1:8080/api/address_info_validation/",
        formData
      );

      // Check if response and response.data are defined
      if (!response || !response.data) {
        throw new Error("Invalid server response");
      }

      // clear any previous errors
      setError("");

      // redirect the user to the next form upon success
      navigate(`${next}/`);
    } catch (error) {
      setError(error.response.data.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-12 d-flex justify-content-center align-items-center flex-column mt-5">
        <h1>Address Confirmation</h1>
        <p>please fill in the form below accurately</p>
        <div className="form-group col-md-6">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            className="form-control"
            value={formData.country}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            className="form-control"
            value={formData.city}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            name="street"
            id="street"
            className="form-control"
            value={formData.street}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="building_number">Building Number: </label>
          <input
            type="number"
            name="building_number"
            id="building_number"
            className="form-control"
            value={formData.building_number}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="floor_number">Floor Number: </label>
          <input
            type="number"
            name="floor_number"
            id="floor_number"
            className="form-control"
            value={formData.floor_number}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="apartment_number">Apartment Number: </label>
          <input
            type="number"
            name="apartment_number"
            id="apartment_number"
            className="form-control"
            value={formData.apartment_number}
            required={true}
            onChange={handleChange}
          />
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
