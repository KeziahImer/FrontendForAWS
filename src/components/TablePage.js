import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TablePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Récupérer tous les utilisateurs
    axios.get('https://ton-api.amazonaws.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://ton-api.amazonaws.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      });
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <Link to="/create">Créer un nouvel utilisateur</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`}>Editer</Link>
                <button onClick={() => handleDelete(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
