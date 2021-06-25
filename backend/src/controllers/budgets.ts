import express, { Request, Response } from 'express'
import { _mBudgetsCollection, _mExpensesCollection } from '../index'
import mongodb, { ObjectId } from 'mongodb'

export const getBudgets = (req: Request, res: Response) => {

}

export const getBudgetById = async (req: Request, res: Response) => {
    const result = await _mBudgetsCollection.findOne({ _id: new ObjectId(req.params.id) })
    console.log('getbudgetsbyid', result)
    res.send(result)
}

// TODO: figure out how to keep track of current month and update budget
// -> add field: currentMonth
// -> whenever user signs on budget is updated or when user adds expense
export const createBudget = (req: Request, res: Response) => {
    
}

export const editBudgetById = (req: Request, res: Response) => {
    
}

export const deleteBudgetById = (req: Request, res: Response) => {
    
}


