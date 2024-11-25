import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const UserContext = createContext();

// Hook para usar el contexto
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Guardar en localStorage
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Limpiar localStorage
    localStorage.removeItem('token'); // Limpiar token si existe
  };

  // Recuperar el usuario del localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Validaciones de roles
  const isSeller = user?.role === 'seller';
  const isBuyer = user?.role === 'buyer';

  return (
    <UserContext.Provider value={{ user, login, logout, isSeller, isBuyer }}>
      {children}
    </UserContext.Provider>
  );
};
