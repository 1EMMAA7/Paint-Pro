const db = require('../config/db');

exports.createCotizacion = (req, res) => {
  const { idCotizacion, idCliente, idEmpleado, fecha, total } = req.body;

  const query = `
    INSERT INTO cotizaciones (idCliente, idEmpleado, fecha, total)
    VALUES (?, ?, ?, ?)`;

  db.query(query, [idCliente, idEmpleado, fecha, total], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al insertar el ticket', details: err });

    res.status(201).json({
      message: 'Cotizacion creada exitosamente',
      CotizaciontId: result.insertId
    });
  });
};
