import express from 'express';
import morgan from 'morgan';
import { router } from './routes.js';

const app = express();

app.set('port', 3000);
app.use(morgan('dev'));
app.use(express.json());

// Redirigir la ruta raíz a /libros
app.get('/', (req, res) => {
    res.redirect('/libros');
});

app.use(router);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
