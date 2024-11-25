import { useState } from 'react';
import { useUser } from '../context/UserContext';
import styled from 'styled-components';

const UploadProductPage = () => {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Recuperar token

    // Validación: Verificar que el precio sea un número mayor que 0
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setMessage('El precio debe ser un número mayor a 0');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/upload-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ name, price: numericPrice, stock }), // price convertido a número
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Producto subido exitosamente');
        setName('');
        setPrice('');
        setStock('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error al subir el producto');
    }
  };

  return (
    <Container>
      <Card>
        <h1>Subir Producto</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <button type="submit">Subir Producto</button>
        </form>
        {message && <p>{message}</p>}
      </Card>
    </Container>
  );
};

// Estilos
const Container = styled.div`
  padding: 16px;
`;

const Card = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default UploadProductPage;
