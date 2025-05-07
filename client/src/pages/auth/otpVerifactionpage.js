import React, { useState } from 'react';
import { InputOtp } from 'primereact/inputotp'; // Importing the InputOtp component from PrimeReact


function OtpVerify() {
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP
  const [email, setEmail] = useState('');


  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email Submitted:', email);
    // Simulate sending OTP to the email
    alert(`OTP sent to ${email}`);
    setStep(2); // Move to Step 2
  };
  const [token, setTokens] = useState();


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      {step === 1 && (
        <>
          <h2>Enter Email</h2>
          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '10px', marginBottom: '20px', fontSize: '16px' }}
              required
            />
            <button
              type="submit"
              style={{
                padding: '10px',
                fontSize: '16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Send OTP
            </button>
          </form>
        </>
      )}
      {step === 2 && (
        <>
        <div 
          style={{
                padding: '9px',
                fontSize: '16px',
                
                marginTop: '3px',
                color: 'black',
                border: 'none',
                
              }}>
          <h2>Enter OTP</h2>
          </div>
          <div className="card flex justify-content-center"
          style={{
                padding: '9px',
                fontSize: '16px',
                marginTop: '20px',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }} >
            <InputOtp value={token} onChange={(e) => setTokens(e.value)} integerOnly/>
        </div>
            <button
              type="submit"
              style={{
                padding: '9px',
                fontSize: '16px',
                marginTop: '20px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Verify OTP
            </button>
         
        </>
      )}
    </div>
  );
}

export default OtpVerify;