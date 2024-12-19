import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormPage = ({ match, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Si l'ID est passé en paramètre (pour l'édition)
  useEffect(() => {
    const { id } = match.params;
    if (id) {
      // Si on édite un utilisateur, on récupère les données depuis l'API
      axios.get(`https://ton-api.amazonaws.com/users/${id}`)
        .then(response => {
          const { name, email } = response.data;
          setName(name);
          setEmail(email);
          setIsEditing(true);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        });
    }
  }, [match.params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email };
    
    const { id } = match.params;
    if (isEditing) {
      // Mise à jour d'un utilisateur existant
      axios.put(`https://ton-api.amazonaws.com/users/${id}`, userData)
        .then(() => {
          history.push('/');
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        });
    } else {
      // Création d'un nouvel utilisateur
      axios.post('https://ton-api.amazonaws.com/users', userData)
        .then(() => {
          history.push('/');
        })
        .catch(error => {
          console.error('Erreur lors de la création de l\'utilisateur:', error);
        });
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Editer l\'utilisateur' : 'Créer un nouvel utilisateur'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Mettre à jour' : 'Créer'}</button>
      </form>
    </div>
  );
};

export default FormPage;
