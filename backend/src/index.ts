import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongodb, { MongoClient } from 'mongodb';

import usersRoutes from './routes/users'
import familiesRoutes from './routes/families'
import expensesRoutes from './routes/expenses'
import budgetsRoutes from './routes/budgets'

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
export let _mUsersCollection: mongodb.Collection<any>;
export let _mFamiliesCollection: mongodb.Collection<any>;
export let _mExpensesCollection: mongodb.Collection<any>; 
export let _mBudgetsCollection: mongodb.Collection<any>;
const uri =  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.rewpw.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

(async () => {
  console.log('hello')
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = client.db(process.env.MONGODB_DATABASE)

  try {
    _mUsersCollection = db.collection('Users')
    _mFamiliesCollection = db.collection('Families')
    _mExpensesCollection = db.collection('Expenses')
    _mBudgetsCollection = db.collection('Budgets')
  } catch (err) {
    console.log('error connecting to Mongodb: ', err)
  }
})()
  .catch(err => console.log(err))

app.use('/users', usersRoutes)
app.use('/families', familiesRoutes)
app.use('/expenses', expensesRoutes)
app.use('/budgets', budgetsRoutes)

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));