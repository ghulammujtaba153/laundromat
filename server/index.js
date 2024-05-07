import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import connectDB from './database/db.js';
import customerRouter from './routers/routers.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use('/api', customerRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});