import React from 'react';
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
      // Make API call to register endpoint
      const response = await axios.post('http://localhost:8000/api/v1/users/register', {
        name,
        email,
        password,
      });
      // Log the response for debugging
      console.log('Registration Response:', response.data);
      // Show success message and navigate to the sign-in page
      alert('Registration successful! Please log in.');
      toggle(true); // Switch to the Sign In form
      navigate('/signin');
    } catch (error) {
      // Handle errors and set error message
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        email,
        password,
      });
      console.log('Login Response:', response.data); // Log the response data
      localStorage.setItem('accessToken', response.data.accessToken); // Store the token
      alert('Login successful!');
      navigate('/'); 
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };


  return (

    //SignUP

    <Components.Container>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Components.SignUpContainer signIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input 
           type="text" 
           placeholder="Name"
           value={name} 
           onChange={(e) => setName(e.target.value)} 
           />

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

          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>

      </Components.SignUpContainer>


      //SignIn  
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
          <Components.Button >Sign In</Components.Button>
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