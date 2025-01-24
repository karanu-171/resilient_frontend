import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate =  useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { username, password });

    let isValid = true;

    if (!username) {
      setUsernameError('Username is required.');
      isValid = false;
    } 
  
    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    try {
      const response = await axios.post(
        'http://197.155.71.138:8001/api/v1/authentication/login',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        const token  = response.data.entity.token;
        toast.success("login successful");
          window.localStorage.setItem('token', token);
          navigate("/add");
      } else {
        setError(response.data.message || 'Failed to login. Please check your credentials.');
        toast.error("login  failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Container>
      <Toaster/>
      <Row className="justify-content-md-center align-items-center mt-5">
        <Col xs={12} md={6} className='shadow-lg p-4 mt-5'>
         <center>
         <img src='/login.jpg' className='mb-3' style={{width:'150px', height:'150px'}}/>
         </center>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-5" controlId="formBasicUsername">
              <Form.Label >Username</Form.Label>
              <Form.Control
                className='py-3'
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Label >Password</Form.Label>
              <Form.Control
                type="password"
                className='py-3'
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
