import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongodb, { MongoClient } from 'mongodb';

import usersRoutes from './routes/users'

dotenv.config();

const PORT = process.env.PORT || 3030;
const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  console.log('request: ', req.originalUrl)
  next()
});

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Heard Project</h1>');
});

// MONGODB
export let _mUserCollection: mongodb.Collection<any>;
const uri =  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.rewpw.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

(async () => {
  console.log('hello')
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = client.db(process.env.MONGODB_DATABASE)

  try {
    _mUserCollection = db.collection('Users')
  } catch (err) {
    console.log('error connecting to Mongodb: ', err)
  }
})()
  .catch(err => console.log(err))

app.use('/users', usersRoutes)

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));