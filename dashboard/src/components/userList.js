import React from 'react';

const UserList = ({ users, paginate, usersPerPage, totalUsers }) => {
  //genera los números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="user-list">
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}><p><strong>Nombre:</strong>{" "+user.firstname+" "+user.lastname+" "}<strong>Email:</strong>{" "+user.email}</p></li> 
        ))}
      </ul>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
