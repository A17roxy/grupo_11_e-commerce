import React, { useState, useEffect } from 'react';
import UserList from './userList';
import LastUser from './lastUser';
import TotalsList from './totalsList';
import ProductList from './productList';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [lastUser, setLastUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    const [products, setProducts] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [currentProdPage, setCurrentProdPage] = useState(1);
    const productPerPage = 4; 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/users/listUsers');
                const result = await response.json();
                if (result.status === 200) {
                    setUsers(result.data);
                } else {
                    console.error('Error al cargar el último usuario:', result);
                }
            } catch (error) {
                console.error('Error al cargar la lista de usuarios:', error);
            }
        };

        const fetchLastUser = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/users/lastUser');
                const result = await response.json();
                if (result.status === 200) {
                    setLastUser(result.data);
                } else {
                    console.error('Error al cargar el último usuario:', result);
                }
            } catch (error) {
                console.error('Error al cargar el último usuario:', error);
            }
        };

        const fetchProducts = async () => {
            try{
                const response = await fetch('http://localhost:3001/api/products/listProducts');
                const result = await response.json();
                if(result.status === 200){
                    setProductsData(result);
                    setProducts(result.productos);
                }else {
                    console.error('Error al cargar lista de productos', result);
                }

            } catch (error){
                console.error('Error al cargar los datos')
            }
        }

        setProductsData();
        fetchLastUser();
        fetchUsers();
        fetchProducts();
        
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    


    const indexOfLastProduct = currentProdPage * productPerPage;
    const indexOfFirsProduct = indexOfLastProduct - productPerPage;
    const currentProduct = products.slice(indexOfFirsProduct, indexOfLastProduct);

    const prodPaginate = (pageNumber) => setCurrentProdPage(pageNumber);

    return (
        <div className="dashboard-containter">
            <div className="totals-list">
                <TotalsList users={users} products={productsData}/>
            </div>
            <div className="last-user-section">
                <LastUser lastUser={lastUser} />
            </div>
            <div className="user-list-section">
                <UserList users={currentUsers} paginate={paginate} usersPerPage={usersPerPage} totalUsers={users.length} />
            </div>
            <br></br>
            <br></br>
            <div className="product-list-section">
                <ProductList product={currentProduct} paginate={prodPaginate} prodPerPage={productPerPage} totalProducts={products.length} />
            </div>
            <br></br>
            <br></br>

  
        </div>
    );
};

export default Dashboard;

