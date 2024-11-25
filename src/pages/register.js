import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // Rol predeterminado
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Usuario registrado exitosamente');
      setIsSuccess(true);

      // Redirige al login después de 2 segundos
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setMessage(data.message);
      setIsSuccess(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Registro</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="buyer">Comprador</option>
            <option value="seller">Vendedor</option>
          </Select>
          <Button type="submit">Registrar</Button>
        </Form>
        {message && <Message success={isSuccess}>{message}</Message>}
        <FooterText>
          ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión aquí</Link>
        </FooterText>
      </Card>
    </Container>
  );
};

// Estilos
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  padding: 16px;
`;

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 4px rgba(0, 112, 243, 0.3);
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  background-color: white;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 4px rgba(0, 112, 243, 0.3);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const Message = styled.p`
  margin-top: 16px;
  color: ${(props) => (props.success ? 'green' : '#e74c3c')};
  font-size: 0.9rem;
`;

const FooterText = styled.p`
  margin-top: 16px;
  font-size: 0.9rem;
  color: #555;

  a {
    color: #0070f3;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default RegisterPage;
