import { CartProvider } from '../context/CartContext';
import { UserProvider } from '../context/UserContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </UserProvider>
  );
}
