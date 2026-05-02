import express from 'express';
import authRouter from './src/routes/auth.routes.js';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});