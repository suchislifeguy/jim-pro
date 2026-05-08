import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { onAuthStateChanged } from 'firebase/auth';
import './index.css';
import App, { ErrorBoundary } from './App.jsx';
import Login from './Login.jsx';
import { auth } from './firebase.js';

const Root = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  if (user === undefined) return null;
  if (!user) return <Login />;
  return <App />;
};

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <Root />
  </ErrorBoundary>,
);
