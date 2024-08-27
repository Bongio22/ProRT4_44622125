import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router();

// Rutas para la gestión de libros
router.get('/libros', libro.libros);
router.get('/libroSolicitar', libro.libro);
router.post('/libroAdd', libro.add);
router.put('/libroActualizar/:id', libro.update);
router.delete('/libroEliminar/:id', libro.eliminar);
