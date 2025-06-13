const db = require('../config/db');

exports.createTicket = (req, res) => {
  const { idCliente, idEmpleado, idCotizacion, fecha, total, estatus } = req.body;

  const query = `
    INSERT INTO tickets (idCliente, idEmpleado, idCotizacion, fecha, total, estatus)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [idCliente, idEmpleado, idCotizacion, fecha, total, estatus], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al insertar el ticket', details: err });

    res.status(201).json({
      message: 'Ticket creado exitosamente',
      ticketId: result.insertId
    });
  });
};
