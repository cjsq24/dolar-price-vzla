import http from 'http';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
//Para manejar las variables de entorno
import 'dotenv/config';

import routes from './modules/routes';
import dbConfig from './dbConfig';

const app = express();
const server = http.createServer(app);

//middlewares
//Para mostrar en la consola las peticiones
app.use(morgan('dev'))
app.use(cors())
//Para que el servidor pueda recibir en formato json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes);

app.get('/', (req, res) => {
   res.send('Backend de dolar-price');
});

server.listen(process.env.PORT || 4000, () => {
   console.log(`Server on port ${process.env.PORT || 4000}`);
   dbConfig();
});
