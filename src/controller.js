import { pool } from './database.js';

class LibroController {

    // Obtiene la lista de todos los libros
    async libros(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los libros', error });
        }
    }

    // Obtiene la lista de un libro
    async libro(req, res) {
        try {
            const { id } = req.params;
            const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ message: 'Libro no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el libro', error });
        }
    }

    // Añade un libro 
    async add(req, res) {
        try {
            const libro = req.body;

            // Validar ISBN
            if (!/^\d{13}$/.test(libro.ISBN)) {
                return res.status(400).json({ message: 'ISBN debe contener 13 dígitos numéricos' });
            }

            const [result] = await pool.query(
                'INSERT INTO libros (nombre, autor, categoria, anio_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)', 
                [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]
            );
            res.status(201).json({ "Id insertado": result.insertId });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar el libro', error });
        }
    }

    // Actualiza el libro
    async update(req, res) {
        try {
            const { id } = req.params;
            const libro = req.body;

            // Valida ISBN
            if (!/^\d{13}$/.test(libro.ISBN)) {
                return res.status(400).json({ message: 'ISBN debe contener 13 dígitos numéricos' });
            }

            const [result] = await pool.query(
                'UPDATE libros SET nombre = ?, autor = ?, categoria = ?, anio_publicacion = ?, ISBN = ? WHERE id = ?', 
                [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, id]
            );
            if (result.affectedRows > 0) {
                res.json({ message: 'Libro actualizado correctamente' });
            } else {
                res.status(404).json({ message: 'Libro no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el libro', error });
        }
    }

    // Elimina libro utilizando el ISBN
    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const [result] = await pool.query('DELETE FROM libros WHERE ISBN = ?', [id]);
            if (result.affectedRows > 0) {
                res.json({ message: 'Libro eliminado correctamente' });
            } else {
                res.status(404).json({ message: 'Libro no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el libro', error });
        }
    }
}

export const libro = new LibroController();

