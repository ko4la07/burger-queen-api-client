import React, { useEffect, useState } from "react";
import UsersTable from './UsersTable'
import '../styles/Products.css';
import CreateUser from "./CreateUser";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Users = () => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(1);
  
  const urlUsers = `https://lim015-burger-queen-api.herokuapp.com/users?page=${index}`;

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

  const onPrevious = () => {
    setIndex(index - 1);
  };

  const onNext = () => {
    setIndex(index + 1);
  };
  // console.log(index);
  
  return (
    <div className = 'container-products'>
      <CreateUser fetchUsers = {fetchUsers} />
      <div>
      <UsersTable users = {users} fetchUsers = {fetchUsers}/>
      </div>
      <div className = 'container-links-pagination'>
        {
          index === 1 ? null : (<button onClick = {onPrevious} className = 'pagination'><MdKeyboardArrowLeft/>Página anterior</button>)
        }
        {
          users.length < 10 ? null : (<button onClick = {onNext} className = 'pagination'>Página siguiente <MdKeyboardArrowRight/></button>)
        }
      </div>
    </div>
  )
}

export default Users;

