import { useState } from 'react';
import { useUser } from '../context/UserContext';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { login } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Inicio de sesión exitoso');
        login({ email: data.email, role: data.role }); // Incluye el rol en el contexto
        localStorage.setItem('token', data.token);

        // Redirige al home
        router.push('/');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Ocurrió un error. Inténtalo nuevamente.');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Iniciar Sesión</Title>
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
          <Button type="submit">Iniciar Sesión</Button>
        </Form>
        {message && <Message>{message}</Message>}
        <FooterText>
          ¿No tienes una cuenta? <Link href="/register">Regístrate aquí</Link>
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
  color: ${(props) => (props.error ? '#e74c3c' : 'green')};
  font-size: 0.9rem;
`;

const FooterText = styled.p`
  margin-top: 16px;
  font-size: 0.9rem;
  color: #555;

  a {
    color: #0070f3;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default LoginPage;
