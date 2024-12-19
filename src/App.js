import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [editItemId, setEditItemId] = useState(null);

  const addItem = () => {
    if (inputName.trim() !== '' && inputEmail.trim() !== '') {
      setItems([
        ...items,
        { id: Date.now(), name: inputName, email: inputEmail },
      ]);
      setInputName('');
      setInputEmail('');
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setEditItemId(item.id);
    setInputName(item.name);
    setInputEmail(item.email);
  };

  const updateItem = () => {
    setItems(
      items.map(item =>
        item.id === editItemId
          ? { ...item, name: inputName, email: inputEmail }
          : item
      )
    );
    setEditItemId(null);
    setInputName('');
    setInputEmail('');
  };

  return (
    <div className="App">
      <h1>Simple CRUD List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        {editItemId ? (
          <button onClick={updateItem}>Update Item</button>
        ) : (
          <button onClick={addItem}>Add Item</button>
        )}
      </div>

      <ul>
        {items.length === 0 ? (
          <li>No items added yet!</li>
        ) : (
          items.map(item => (
            <li key={item.id}>
              <strong>{item.name}</strong> ({item.email})
              <button onClick={() => editItem(item)}>Edit</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
