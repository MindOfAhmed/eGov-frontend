import { Card } from "./Card";
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
    <>
        {/* header and image */}
        <div className="row mt-5">
            <div className="col-md-6">
                <h1>Welcome To The Digital Society!</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ad saepe cumque deleniti maiores
                    iure quibusdam in quis? Quasi, saepe dolorum natus hic odit perferendis optio dolores dolore 
                    laudantium magni?
                </p>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
                <img src="https://via.placeholder.com/250" alt="placeholder" />
            </div>
        </div>
        {/* services */}
        <div className="row mt-5 mb-3">
            <div className="col-md-12 d-flex justify-content-center">
                <h3>Available Services</h3>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <Card  
                title="Passport Renewal"
                icon="fa-solid fa-passport"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ad saepe cumque deleniti maiores
                iure quibusdam in quis?"
            />
            <Card  
                title="Driver's License Renewal"
                icon="fa-solid fa-id-card"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ad saepe cumque deleniti maiores
                iure quibusdam in quis?"
            />
            <Card  
                title="ID Card"
                icon="fa-solid fa-id-card-clip"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ad saepe cumque deleniti maiores
                iure quibusdam in quis?"
            />
        </div>
        <div className="row  d-flex justify-content-center mt-4 mb-3">
            <div className="col-md-12 d-flex justify-content-center">
                <Link to="/services" className="button">Learn More</Link>
            </div>
        </div>
        {/* Town Hall */}
        <div className="row d-flex mt-5">
            <div className="col-md-4 d-flex justify-content-end image-container">
                <img src="https://via.placeholder.com/250" alt="placeholder" className="first-image"/>
            </div>
            <div className="col-md-1">
                <p className="town_hall_text">Town Hall</p>
            </div>
        </div>
        <div className="row d-flex">
            <div className="col-md-3 mt-5 d-flex align-items-center">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ex sint harum nisi corrupti aut nihil
                    quasi. Ipsa deserunt modi aliquam ex sed atque quidem excepturi, natus hic, enim rerum!
                </p>
            </div>
            <div className="col-md-5 image-container">
                <img src="https://via.placeholder.com/300" alt="placeholder" className="second-image"/>
            </div>
        </div>
        <div className="row d-flex">
            <div className="col-md-4 image-container">
                <img src="https://via.placeholder.com/250" alt="placeholder" className="third-image"/>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center">
                <Link to="/townhall" className="text-center button">Learn More</Link>
            </div>
        </div>
    </>
);
};