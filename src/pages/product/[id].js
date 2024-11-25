import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  // Producto de ejemplo
  const product = {
    id,
    name: `Producto ${id}`,
    price: 10.99,
    description: 'Este es un producto de ejemplo.',
    image: '/images/product1.jpg',
  };

  return (
    <Container>
      <Image src={product.image} alt={product.name} />
      <Details>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
        <Button onClick={() => addToCart(product)}>
          Agregar al Carrito
        </Button>
      </Details>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 0 auto;
  display: block;
`;

const Details = styled.div`
  text-align: center;

  h1 {
    margin: 16px 0;
  }

  p {
    margin: 8px 0;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

export default ProductDetailPage;
