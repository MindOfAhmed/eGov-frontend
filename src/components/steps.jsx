import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Steps = ({ stepsContext }) => {
    const [step, setStep] = useState(1); // this will control what's viewed on the card
    
    // handle the incrementing and decrementing of the step
    const handleIncrementStep = () => {
        if (step < stepsContext.length) {
            setStep((s) => s + 1);
        }
    };
    const handleDecrementStep = () => {
        if (step > 0) {
            setStep((s) => s - 1);
        }
    };

    return (
        <div className='row justify-content-center align-items-center mt-3'>
                <div className='card shadow d-flex col-md-6 flex-column justify-content-center align-items-center my-3 py-3' >
                    <h3>Step: {step}</h3>
                    <div className='d-flex flex-column my-3'>
                        <FontAwesomeIcon icon={stepsContext[step-1].icon} size='2x'/>
                        <p className='me-3 mt-2'> {stepsContext[step-1].step} </p>
                    </div>
                    <div className='col-md-12 d-flex justify-content-between'>
                        <button 
                            className={step === 1 ? "invisible" : "button"}
                            onClick={handleDecrementStep}
                        >
                            Prev
                        </button>
                        <button 
                            className={step === 4 ? "invisible" : "button"}
                            onClick={handleIncrementStep}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
    );
};