import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send(`Funcionando a tope ponte a trabajar `);
});

app.listen(PORT, () => {
  console.log(`base url server => http://localhost:${PORT}/
  base url graphql => http://localhost:${PORT}/graphql/`);
});
