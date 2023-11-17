import React, { useState, useEffect } from 'react';
import UserList from './userList';
import LastUser from './lastUser';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [lastUser, setLastUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 17;

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

        fetchUsers();
        fetchLastUser();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="dashboard">
            <div className="user-list-section">
                <UserList users={currentUsers} paginate={paginate} usersPerPage={usersPerPage} totalUsers={users.length} />
            </div>
            <div className="last-user-section">
                <LastUser lastUser={lastUser} />
            </div>
        </div>
    );
};

export default Dashboard;

