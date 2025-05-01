import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import * as Components from "./Components";
import axios from 'axios'; // Import axios

function Signin() {
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate(); // Add useNavigate hook
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });
      alert('Registration successful! Please log in.');
      toggle(true); // Switch to Sign In form
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      alert('Login successful!');
      navigate('/dashboard'); // Navigate to dashboard on successful login
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Components.Container>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Components.Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Components.Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSignIn}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Anchor
            onClick={(e) => {
              e.preventDefault();
              navigate('/otpVerify'); // Navigate to OTP verification page
            }}
          >
            Forgot your password?
          </Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
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
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Signin;