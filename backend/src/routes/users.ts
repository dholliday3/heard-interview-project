import express from 'express'
import { getUsers, getUserByEmail, createUser, editUser, deleteUser } from '../controllers/users'

const router = express.Router() 

router.get('/', getUsers)
    .get('/:email', getUserByEmail)    
    .post('/', createUser)
    .put('/:email', editUser)
    .delete('/:email', deleteUser)

export default router