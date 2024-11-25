import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <Container>
      <Header />
      <Main>
        <h1>Bienvenido a LocalMarket</h1>
        <p>Encuentra productos locales cerca de ti.</p>
      </Main>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  text-align: center;
`;

export default HomePage;
