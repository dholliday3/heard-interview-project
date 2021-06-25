import express from 'express'
import { getExpenses, getExpenseByBudgetId, getExpenseByExpenseId, createExpenseByEmail, editExpenseByExpenseId, deleteExpenseByExpenseId } from '../controllers/expenses'

const router = express.Router()

router.get('/', getExpenses)
    .get('/:expenseId', getExpenseByExpenseId)
    .get('/:budgetId', getExpenseByBudgetId)
    .post('/:email', createExpenseByEmail)
    .put('/:expenseId', editExpenseByExpenseId)
    .delete('/:expenseId', deleteExpenseByExpenseId)

export default router