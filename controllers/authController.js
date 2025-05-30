const db = require('../config/db');

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });

    if (results.length > 0) {
      res.json({ message: 'Login exitoso', user: results[0] });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  });
};
