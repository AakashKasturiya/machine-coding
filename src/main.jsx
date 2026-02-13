import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/tailwind.css';
import App from './App.jsx';
import { ModalProvider } from './components/Modal/ModalContext.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { FeedProvider } from './context/FeedContext'
import { ToastProvider } from "./context/ToastContext";

import { AuthProvider } from "./context/LoginAuthContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
        <ModalProvider>
          <AuthProvider>
          <ThemeProvider>
              <FeedProvider>
                 <ToastProvider>
                    <App />
                  </ToastProvider>
              </FeedProvider>
          </ThemeProvider>
          </AuthProvider>
        </ModalProvider>
    </BrowserRouter>
  </StrictMode>
);
