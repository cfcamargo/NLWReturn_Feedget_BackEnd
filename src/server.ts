import express, { Router } from 'express';
import cors from 'cors';
import { routes } from './routes';
import bodyParser from 'body-parser'



const app = express();

// middleware de uso do json no express
app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json({ limit: '8mb' }))
app.use(express.json());
app.use(routes)


//Config da porta que o servidor vai ouvir

app.listen(3333, () => {
  console.log('Http Server Runing...');
});