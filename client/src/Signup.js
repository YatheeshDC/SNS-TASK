import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    role: 'User',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', formData);
      Swal.fire({
        icon: 'success',
        title: 'User registered successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/login');
    } catch (error) {
      setError('Signup failed, please try again.');
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
        <h2 style={styles.title}>Signup</h2>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          style={styles.input}
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile No"
          required
          style={styles.input}
        />
        <select name="role" value={formData.role} onChange={handleChange} style={styles.select}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Guest">Guest</option>
        </select>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Signup</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
      <h5 style={styles.signupText}>Already have an account? <Link to="/login" style={styles.link}>Login</Link></h5>
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
  select: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#FFF8DC',
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

export default Signup;
