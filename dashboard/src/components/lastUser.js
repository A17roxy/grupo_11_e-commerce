import React from 'react';

const LastUser = ({ lastUser }) => {
  if (!lastUser) {
    return <p>Cargando información del último usuario...</p>;
  }

  return (
    <div className="last-user">
      <h2>Último Usuario Creado</h2>
      <p><strong>Nombre:</strong> {lastUser.firstname+" "+lastUser.lastname}</p>
      <p><strong>Email:</strong> {lastUser.email}</p>
    </div>
  );
};

export default LastUser;
