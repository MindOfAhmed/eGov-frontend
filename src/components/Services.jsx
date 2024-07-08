import passport from "../assets/passport.jpg";
import driver from "../assets/driver.jpg";
import id from "../assets/id.jpg";
import vehicle from "../assets/vehicle.jpg";
import property from "../assets/property.jpg";
import { Service } from "./Service";

export const Services = () => {
  const passportSteps = [
    { step: "Fill in your personal details", icon: "fa-solid fa-user" },
    { step: "Confirm your address", icon: "fa-solid fa-map-marker" },
    {
      step: "Confirm your current passport details and upload new picture",
      icon: "fa-solid fa-passport",
    },
    {
      step: "You're all set & we will process your request!",
      icon: "fa-solid fa-check-circle",
    },
  ];
  const licensetSteps = [
    { step: "Fill in your personal details", icon: "fa-solid fa-user" },
    { step: "Confirm your address", icon: "fa-solid fa-map-marker" },
    {
      step: "Confirm your current license details and upload new picture",
      icon: "fa-solid fa-id-card",
    },
    {
      step: "You're all set & we will process your request!",
      icon: "fa-solid fa-check-circle",
    },
  ];
  const IDSteps = [
    { step: "Fill in your personal details", icon: "fa-solid fa-user" },
    { step: "Confirm your address", icon: "fa-solid fa-map-marker" },
    {
      step: "Confirm your current ID card details and upload new picture",
      icon: "fa-solid fa-id-card-clip",
    },
    {
      step: "You're all set & we will process your request!",
      icon: "fa-solid fa-check-circle",
    },
  ];
  const vehicleSteps = [
    { step: "Fill in your personal details", icon: "fa-solid fa-user" },
    {
      step: "Enter the vehicle details & upload a proof document",
      icon: "fa-solid fa-car",
    },
    {
      step: "You're all set & we will process your request!",
      icon: "fa-solid fa-check-circle",
    },
  ];
  const propertySteps = [
    { step: "Fill in your personal details", icon: "fa-solid fa-user" },
    {
      step: "Enter the property details & upload a proof document",
      icon: "fa-solid fa-house-user",
    },
    {
      step: "You're all set & we will process your request!",
      icon: "fa-solid fa-check-circle",
    },
  ];

  return (
    <>
      <Service
        title="Passport Renewal"
        picture={passport}
        stepsContext={passportSteps}
        serviceLink={"/services/citizen_info"}
      />
      <Service
        title="Vehicle Registration"
        picture={vehicle}
        stepsContext={vehicleSteps}
        serviceLink={"/"}
      />
      <Service
        title="Driver's License Renewal"
        picture={driver}
        stepsContext={licensetSteps}
        serviceLink={"/"}
      />
      <Service
        title="Property Registration"
        picture={property}
        stepsContext={propertySteps}
        serviceLink={"/"}
      />
      <Service
        title="ID Card Renewal"
        picture={id}
        stepsContext={IDSteps}
        serviceLink={"/"}
      />
    </>
  );
};
