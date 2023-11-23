import React from 'react';

const ProductList = ({ product, paginate, prodPerPage, totalProducts }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / prodPerPage); i++) {
        pageNumbers.push(i);
    }

  return (
    <div className="user-list">
      <h2>Lista de productos</h2>
      <ul>
      {product.map(product => (
    <li key={product.id}>
        <p>
            <strong>Categoria:</strong> {product.type}<br></br> 
            <strong>Titulo:</strong> {product.title}<br></br> 
            <strong>Artista:</strong> {product.artist}<br></br>
            <strong>Género:</strong> {product.id_genre_genre.genre}<br></br>
            <strong>Año:</strong> {product.year}<br></br>
            <strong>Precio:</strong> {product.price}<br></br> 
        </p>
    </li> 
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

export default ProductList;