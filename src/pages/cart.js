import styled from 'styled-components';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calcular el total con precios numéricos
  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <Container>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <EmptyMessage>El carrito está vacío.</EmptyMessage>
      ) : (
        <>
          <CartList>
            {cart.map((item, index) => (
              <CartItem key={index}>
                <Image src={item.image} alt={item.name} width={80} height={80} />
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    Precio:{' '}
                    {Number(item.price).toLocaleString('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                    })}
                  </p>
                  <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              </CartItem>
            ))}
          </CartList>
          <Total>
            <h3>
              Total:{' '}
              {total.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN',
              })}
            </h3>
            <Button onClick={clearCart}>Vaciar Carrito</Button>
          </Total>
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

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CartItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  h3 {
    margin: 0;
  }

  p {
    margin: 4px 0;
    font-weight: bold;
    color: #333;
  }

  button {
    padding: 8px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #c0392b;
    }
  }
`;

const Total = styled.div`
  margin-top: 16px;
  text-align: center;

  h3 {
    margin-bottom: 16px;
    font-size: 1.5rem;
    color: #333;
  }
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

export default CartPage;
