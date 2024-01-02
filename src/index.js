import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Users from './Users';
import Things from './Things';

const App = ()=> {
  const [users, setUsers] = useState([])
  const [things, setThings] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users')
      setUsers(response.data)
    }
    fetchUsers()
  },[])
  useEffect(() => {
    const fetchThings = async() => {
      const response = await axios.get('/api/things')
      setThings(response.data)
    }
    fetchThings()
  },[])

  return (
    <div>
      <h1>Thing Tracker</h1>
      <div>
        <Users users={users}/>
        <Things things={things} users={users}/>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<App />);
