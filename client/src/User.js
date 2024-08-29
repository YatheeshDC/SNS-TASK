import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          params: { search, role },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [search, role]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          style={styles.searchInput}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.roleSelect}>
          <option value="">All Roles</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Guest">Guest</option>
        </select>
      </div>
      <ul style={styles.userList}>
        {users.map((user) => (
          <li key={user._id} style={styles.userItem}>
            {user.firstName} {user.lastName} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FFF8DC',
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#FFD700',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  searchInput: {
    padding: '10px',
    width: '200px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  roleSelect: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  userList: {
    listStyleType: 'none',
    padding: 0,
  },
  userItem: {
    backgroundColor: '#fff',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default UserList;

