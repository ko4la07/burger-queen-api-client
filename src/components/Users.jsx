import React, { useEffect, useState } from "react";
import UsersTable from './UsersTable'
import CreateUser from "./CreateUser";

const Users = () => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [users, setUsers] = useState([]);
  // console.log(users);
  const urlUsers = 'https://lim015-burger-queen-api.herokuapp.com/users?limit=1000';

  const fetchUsers = async (url) => {
    setUsers( await fetch(url, {
      method :'GET',
      headers : {
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error))
    )};

  useEffect(() => {
      fetchUsers(urlUsers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[urlUsers])

  return (
    <div className = 'container-products'>
      <CreateUser fetchUsers = {fetchUsers} />
      <div className = 'container-table'>
      <UsersTable users = {users} fetchUsers = {fetchUsers}/>
      </div>
    </div>
  )
}

export default Users;

