import styled from 'styled-components';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Image src={product.image} alt={product.name} />
      <Details>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
        <Link href={`/products/${product.id}`}>
          <Button>Ver Detalles</Button>
        </Link>
      </Details>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
`;

const Details = styled.div`
  padding: 16px;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #0073e6;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;

  &:hover {
    background-color: #005bb5;
  }
`;

export default ProductCard;
