import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();
  const [notification, setNotification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch de productos con validación para precios numéricos
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((res) => res.json())
      .then((data) => {
        // Filtra productos válidos
        const validProducts = data.filter(
          (product) =>
            product.name &&
            !isNaN(Number(product.price)) &&
            product.price > 0 &&
            product.stock > 0 // Solo productos con stock disponible
        );
        setProducts(validProducts);
        setFilteredProducts(validProducts); // Inicialmente, muestra todos los productos
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`"${product.name}" añadido al carrito.`);
    setTimeout(() => setNotification(''), 3000); // Notificación desaparece después de 3 segundos
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) &&
        product.stock > 0 // Solo muestra productos con stock disponible
    );

    setFilteredProducts(filtered);
  };

  return (
    <Container>
      <Breadcrumb />
      <Title>Productos Disponibles</Title>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchContainer>
      {notification && <Notification>{notification}</Notification>}
      <Grid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <img src={product.image} alt={product.name} />
            <Details>
              <h3>{product.name}</h3>
              <p>
                Precio:{' '}
                {Number(product.price).toLocaleString('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                })}
              </p>
              <p>Vendedor: {product.seller}</p>
              <p>Stock: {product.stock}</p>
              <Button
                disabled={product.stock === 0}
                onClick={() => handleAddToCart(product)}
              >
                {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
              </Button>
            </Details>
          </ProductCard>
        ))}
        {filteredProducts.length === 0 && (
          <NoResults>No se encontraron productos para "{searchQuery}".</NoResults>
        )}
      </Grid>
    </Container>
  );
};

// Estilos
const Container = styled.div`
  padding: 16px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
`;

const SearchContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #0073e6;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 115, 230, 0.5);
  }
`;

const Notification = styled.div`
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const ProductCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #ddd;
  }
`;

const Details = styled.div`
  padding: 16px;
  text-align: center;

  h3 {
    font-size: 1.2rem;
    color: #333;
    margin: 0 0 8px;
  }

  p {
    font-size: 1.1rem;
    font-weight: bold;
    color: #555;
    margin: 0 0 8px;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#0073e6')};
  color: ${(props) => (props.disabled ? '#666' : 'white')};
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#005bb5')};
  }
`;

const NoResults = styled.div`
  text-align: center;
  color: #666;
  font-size: 1rem;
  margin-top: 16px;
`;

export default ProductsPage;
