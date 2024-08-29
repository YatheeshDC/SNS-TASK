import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      Swal.fire({
        icon: 'success',
        title: 'Login successful',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/users');
    } catch (error) {
      setError('Login failed, please check your credentials.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.svgContainer}>
        <svg style={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#FFD700" fillOpacity="1" d="M0,128L1440,256L1440,320L0,320Z"></path>
        </svg>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
      <h5 style={styles.signupText}>New user? <Link to="/signup" style={styles.link}>Signup</Link></h5>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#FFF8DC',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  svg: {
    width: '100%',
    height: '150px',
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    zIndex: 1,
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '1rem',
    color: '#FFD700',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#FFD700',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    marginTop: '1rem',
    color: 'red',
  },
  signupText: {
    marginTop: '1rem',
    color: '#666',
  },
  link: {
    color: '#FFD700',
    textDecoration: 'none',
  },
};

export default Login;
