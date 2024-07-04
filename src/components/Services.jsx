import passport from '../assets/passport.jpg';
import { Service } from './Service';

export const Services = () => {
    const passportSteps = [
        { step: "Fill in your personal details", icon: "fa-solid fa-user" },
        { step: "Confirm your address", icon: "fa-solid fa-map-marker" },
        { step: "Confirm your current passport details and upload new picture", icon: "fa-solid fa-passport" },
        { step: "You're all set!", icon: "fa-solid fa-check-circle" }
    ]

    return (
        <>
            <Service
                title="Passport Renewal"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quidem rem odio laborum tempore. 
                Consequuntur veritatis repellat, molestiae recusandae earum eum porro, quia repellendus, animi 
                sed possimus tempora asperiores dolore?"
                picture={passport}
                stepsContext={passportSteps}
            />
        </>
    );
};