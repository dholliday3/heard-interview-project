import express from 'express'
import { getBudgets, getBudgetById, createBudget, editBudgetById, deleteBudgetById, getBudgetsByFamilyName } from '../controllers/budgets'

const router = express.Router() 

router.get('/', getBudgets)
    .get('/:id', getBudgetById)
    .get('/familyName/:familyName', getBudgetsByFamilyName)
    .post('/', createBudget)
    .put('/:id', editBudgetById)
    .delete('/:id', deleteBudgetById)

export default router
    