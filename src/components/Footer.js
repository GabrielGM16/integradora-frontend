import styled from 'styled-components';
import Link from 'next/link';

const Footer = () => {
  return (
    <FooterContainer>
      <Nav>
        <Link href="/">Inicio</Link>
        <Link href="/login">Iniciar sesión</Link>
        <Link href="/register">Registro</Link>
        <Link href="/products">Productos</Link>
        <Link href="/cart">Carrito</Link>

      </Nav>
      <p>&copy; {new Date().getFullYear()} LocalMarket</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #f1f1f1;
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
`;

export default Footer;
