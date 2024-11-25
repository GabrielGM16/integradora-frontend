import styled from 'styled-components';
import Link from 'next/link';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { user, logout, isSeller, isBuyer } = useUser();

  return (
    <Nav>
      <Logo>
        <Link href="/">LocalMarket</Link>
      </Logo>
      <Links>
        <Link href="/products">Productos</Link>
        {isSeller && <Link href="/upload-product">Subir Producto</Link>}
        {isBuyer && <Link href="/cart">Carrito</Link>}
        {isBuyer && <Link href="/checkout">Checkout</Link>}
        {user ? (
          <>
            <UserInfo>Hola, {user.email}</UserInfo>
            <LogoutButton onClick={logout}>Cerrar Sesión</LogoutButton>
          </>
        ) : (
          <>
            <Link href="/login">Iniciar Sesión</Link>
            <Link href="/register">Registro</Link>
          </>
        )}
      </Links>
    </Nav>
  );
};

// Estilos
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(90deg, #8e44ad, #1abc9c);
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-shadow: 0 0 10px #f39c12;
    }
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-shadow: 0 0 10px #f39c12;
    }
  }
`;

const Links = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const UserInfo = styled.span`
  font-weight: bold;
  color: #fceabb;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    text-shadow: 0 0 10px #f39c12;
  }
`;

export default Header;
