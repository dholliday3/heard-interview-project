import express from 'express'
import { getFamilies, getFamilyByEmail, createFamily, editFamily, deleteFamily, getFamilyByName } from '../controllers/families'

const router = express.Router()

router.get('/', getFamilies)
    .get('/:email', getFamilyByEmail)
    .get('/name/:name', getFamilyByName)
    .post('/', createFamily)
    .put('/:email', editFamily)
    .delete('/:email', deleteFamily)

export default router