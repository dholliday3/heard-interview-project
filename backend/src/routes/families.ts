import express from 'express'
import { getFamilies, getFamilyByEmail, createFamily, editFamily, deleteFamily } from '../controllers/families'

const router = express.Router()

router.get('/', getFamilies)
    .get('/:email', getFamilyByEmail)
    .post('/', createFamily)
    .put('/:email', editFamily)
    .delete('/:email', deleteFamily)

export default router