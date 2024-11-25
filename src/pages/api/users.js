export default function handler(req, res) {
    const users = [
      { id: 1, email: 'test@example.com', password: '123456' },
      { id: 2, email: 'user@example.com', password: 'password' },
    ];
  
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const user = users.find((u) => u.email === email && u.password === password);
  
      if (user) {
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } else {
      res.status(405).json({ message: 'Método no permitido' });
    }
  }
  