import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();

  // Calcular el total asegurando que los precios sean numéricos
  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de realizar el pedido.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ products: cart, total }),
      });

      if (response.ok) {
        alert('¡Pedido realizado con éxito!');
        clearCart();
      } else {
        const errorData = await response.json();
        alert(`Error al realizar el pedido: ${errorData.message || 'Intenta nuevamente más tarde.'}`);
      }
    } catch (error) {
      alert('Hubo un problema al conectar con el servidor. Intenta nuevamente.');
    }
  };

  return (
    <Container>
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <EmptyMessage>No hay productos en el carrito.</EmptyMessage>
      ) : (
        <>
          <OrderSummary>
            {cart.map((item, index) => (
              <div key={index}>
                <p>{item.name}</p>
                <p>
                  {Number(item.price).toLocaleString('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                  })}
                </p>
              </div>
            ))}
          </OrderSummary>
          <Total>
            Total:{' '}
            {total.toLocaleString('es-MX', {
              style: 'currency',
              currency: 'MXN',
            })}
          </Total>
          <Button onClick={handleCheckout}>Finalizar Compra</Button>
        </>
      )}
    </Container>
  );
};

// Estilos
const Container = styled.div`
  padding: 16px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
`;

const OrderSummary = styled.div`
  margin-bottom: 16px;

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 1rem;
    color: #333;
  }

  p {
    margin: 0;
  }
`;

const Total = styled.h3`
  text-align: center;
  margin-bottom: 16px;
  font-size: 1.5rem;
  color: #333;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

export default CheckoutPage;
