import React, { useState } from 'react';

function OtpVerify() {
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email Submitted:', email);
    // Simulate sending OTP to the email
    alert(`OTP sent to ${email}`);
    setStep(2); // Move to Step 2
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log('OTP Submitted:', otp);
    // Add OTP verification logic here
    alert('OTP Verified!');
  };

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
          <h2>Enter OTP</h2>
          <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
              Verify OTP
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default OtpVerify;