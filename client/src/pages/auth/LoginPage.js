import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import * as Components from "./Components";
import axios from 'axios';
import styled from 'styled-components';

function Signin() {
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('user');
  const [error, setError] = React.useState('');
  const [verificationNeeded, setVerificationNeeded] = React.useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/register', {
        name,
        email,
        password,
        role,
      });
      alert('Registration successful! Please log in.');
      toggle(true);
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setVerificationNeeded(false);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        email,
        password,
      });
      // Check if email is verified
      if (response.data.user && !response.data.user.emailVerified) {
        setVerificationNeeded(true);
        return;
      }
      localStorage.setItem('accessToken', response.data.accessToken);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid credentials. Please check your email and password.");
      } 
      else if (error.response && error.response.status === 404) {
        setError("User not found. Please register.");
      }
      else {
        setError(error.response?.data?.message || "An error occurred");
      }
    }
  };

  // Optional: Resend verification email
  const handleResendVerification = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/verify-email', {
        email,
      });
      alert('Verification email resent. Please check your inbox.');
    } catch (err) {
      alert('Failed to resend verification email.');
    }
  };

  return (
    <Components.Container>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Show verification needed message */}
      {verificationNeeded && (
        <div style={{ color: 'orange', marginBottom: '1rem' }}>
          Your email is not verified. Please check your inbox for a verification link.<br />
          <button onClick={handleResendVerification} style={{marginTop: '8px'}}>Resend Verification Email</button>
        </div>
      )}

      {/* Sign Up */}
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Components.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Components.Select>
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Components.Anchor
            onClick={(e) => {
              e.preventDefault();
              navigate('/otpVerify');
            }}
          >
            Forgot your password?
          </Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
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