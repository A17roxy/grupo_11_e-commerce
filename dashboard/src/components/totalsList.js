import React from 'react';

const TotalsList = ({ users, products }) => {
    if (!products || !users) {
        return <p>Cargando información...</p>;
    }

    const { total_categorias = {} } = products;

    return (
        <div className="totals">
            <h2>Totales</h2>
            <p><strong>Total Usuarios:</strong> {users.length}</p>
            <p><strong>Total Productos:</strong> {products.total}</p>
            <br />
            <h2>Categorias</h2>
            <p><strong>Álbumes:</strong> {total_categorias.Albumes || 'Cargando...'}</p>
            <p><strong>Pistas:</strong> {total_categorias.Pistas || 'Cargando...'}</p>
            <p><strong>Artistas:</strong> {products.total_artistas}</p>
        </div>
    );
};

export default TotalsList;


