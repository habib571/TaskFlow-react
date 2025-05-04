import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; 
import { ProjectProvider } from './contexts/ProjectContext';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> 
      <ProjectProvider>
            <App />
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);