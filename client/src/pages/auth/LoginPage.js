import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import * as Components from "./Components";
import axios from 'axios';

function Signin() {
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate(); // Add useNavigate hook
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Validate input fields
    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/register", {
        name,
        email,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred");
      alert("Error: " + (error.response?.data?.message || "An error occurred"));
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/login", {
        email,
        password,
      });
      alert(response.data.message);
      localStorage.setItem("token", response.data.token); // Save token for authentication
      navigate('/home'); // Redirect to home page after login
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred");
      alert("Error: " + (error.response?.data?.message || "An error occurred"));
    }
  };

  return (
    <Components.Container>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Sign Up */}
      <Components.SignUpContainer signIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
            required
          />
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      {/* Sign In */}
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSignIn}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
          <Components.Anchor
            onClick={(e) => {
              e.preventDefault();
              navigate('/otpVerify'); // Navigate to OTP verification page
            }}
          >
            Forgot your password?
          </Components.Anchor>
          <Components.Button>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      {/* Overlay */}
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start your journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Signin;