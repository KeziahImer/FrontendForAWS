import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './components/FormPage';
import TablePage from './components/TablePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TablePage />} />
          <Route path="/create" element={<FormPage />} />
          <Route path="/edit/:id" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
