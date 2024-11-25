export default function handler(req, res) {
    const products = [
      { id: 1, name: 'Producto 1', price: 10.99, description: 'Descripción del Producto 1', image: '/images/product1.jpg' },
      { id: 2, name: 'Producto 2', price: 12.99, description: 'Descripción del Producto 2', image: '/images/product2.jpg' },
      { id: 3, name: 'Producto 3', price: 8.99, description: 'Descripción del Producto 3', image: '/images/product3.jpg' },
    ];
  
    if (req.method === 'GET') {
      res.status(200).json(products);
    } else {
      res.status(405).json({ message: 'Método no permitido' });
    }
  }
  