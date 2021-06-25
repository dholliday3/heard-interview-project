import express from 'express'
import { getBudgets, getBudgetById, createBudget, editBudgetById, deleteBudgetById } from '../controllers/budgets'

const router = express.Router() 

router.get('/', getBudgets)
    .get('/:id', getBudgetById)    
    .post('/', createBudget)
    .put('/:id', editBudgetById)
    .delete('/:id', deleteBudgetById)

export default router
    