// src/app.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import MainContent from './components/MainContent/MainContent';

const App = () => {
  return (
    <div>
      <h1>My Chrome Extension</h1>
      <MainContent />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
