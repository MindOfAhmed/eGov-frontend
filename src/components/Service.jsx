import { Steps } from "./steps";
import { Link } from "react-router-dom";

export const Service = ({ title, description, picture, stepsContext}) => {
    return (
        <>
            <div className='row mt-5'>
                <div className="col-md-6">
                    <h1> {title} </h1>
                    <p> {description} </p>
                </div>
                <div className='col-md-6'>
                    <img src={picture} alt="passport" width={500} height={250} className="shadow-lg"/>
                </div>
            </div>
            <Steps stepsContext={stepsContext}/>
            <div className="col-md-12 d-flex justify-content-center">
                <Link to="/" className="button">Start!</Link>
            </div>
        </>
    );
};