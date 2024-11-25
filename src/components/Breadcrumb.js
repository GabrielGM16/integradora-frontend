import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();

  // Generar migajas a partir de la ruta actual
  const pathParts = router.pathname.split('/').filter((part) => part);
  const breadcrumbItems = pathParts.map((part, index) => {
    const href = '/' + pathParts.slice(0, index + 1).join('/');
    return { name: capitalize(part), href };
  });

  return (
    <BreadcrumbContainer>
      <Link href="/">Inicio</Link>
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <Separator>/</Separator>
          <Link href={item.href}>{item.name}</Link>
        </React.Fragment>
      ))}
    </BreadcrumbContainer>
  );
};

// Función para capitalizar la primera letra de una palabra
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const BreadcrumbContainer = styled.nav`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  margin-bottom: 16px;
  color: white;

  a {
    color: #f39c12;
    text-shadow: 0 0 5px #fceabb;

    &:hover {
      text-shadow: 0 0 10px #f39c12;
    }
  }
`;

const Separator = styled.span`
  color: #ecf0f1;
`;


export default Breadcrumb;
